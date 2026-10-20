// Rate-limit and spend counters. The ONLY things the fit agent stores:
// a salted, per-day hash of the visitor's IP with a run count, and the
// spend per UTC day and per UTC month in micro-dollars. No job text, ever.
// Schema: migrations/0001_fit_agent.sql.

/**
 * @typedef {object} FitStore
 * @property {(day: string, ipHash: string, limit: number) => Promise<boolean>} takeVisitorRun
 *   true when this visitor still had a run left today (and it is now used)
 * @property {(periods: {day: string, month: string}, micro: number, caps: {day: number, month: number}) => Promise<boolean>} reserve
 *   true when `micro` fits under both caps (and is now reserved)
 * @property {(periods: {day: string, month: string}, reservedMicro: number, actualMicro: number) => Promise<void>} settle
 * @property {(beforeDay: string) => Promise<void>} prune
 */

/** @returns {FitStore} */
export function d1Store(db) {
  return {
    async takeVisitorRun(day, ipHash, limit) {
      // One atomic upsert: the increment only happens while runs < limit.
      const row = await db
        .prepare(
          `INSERT INTO fit_visitors (day, ip_hash, runs) VALUES (?1, ?2, 1)
           ON CONFLICT (day, ip_hash) DO UPDATE SET runs = runs + 1 WHERE runs < ?3
           RETURNING runs`,
        )
        .bind(day, ipHash, limit)
        .first();
      return row !== null && limit >= 1;
    },

    async reserve({ day, month }, micro, caps) {
      await db.batch([
        db.prepare('INSERT OR IGNORE INTO fit_spend (period, micro_usd) VALUES (?1, 0)').bind(day),
        db.prepare('INSERT OR IGNORE INTO fit_spend (period, micro_usd) VALUES (?1, 0)').bind(month),
      ]);
      // A single UPDATE is atomic: both rows move together, or neither does.
      const result = await db
        .prepare(
          `UPDATE fit_spend SET micro_usd = micro_usd + ?1
           WHERE period IN (?2, ?3)
             AND (SELECT micro_usd FROM fit_spend WHERE period = ?2) + ?1 <= ?4
             AND (SELECT micro_usd FROM fit_spend WHERE period = ?3) + ?1 <= ?5`,
        )
        .bind(micro, day, month, caps.day, caps.month)
        .run();
      return result.meta.changes === 2;
    },

    async settle({ day, month }, reservedMicro, actualMicro) {
      await db
        .prepare('UPDATE fit_spend SET micro_usd = MAX(0, micro_usd - ?1 + ?2) WHERE period IN (?3, ?4)')
        .bind(reservedMicro, actualMicro, day, month)
        .run();
    },

    async prune(beforeDay) {
      await db.prepare('DELETE FROM fit_visitors WHERE day < ?1').bind(beforeDay).run();
    },
  };
}

/** In-memory store for mock mode and tests. State lives as long as the isolate. @returns {FitStore} */
export function memoryStore() {
  const visitors = new Map();
  const spend = new Map();
  return {
    async takeVisitorRun(day, ipHash, limit) {
      const key = `${day}|${ipHash}`;
      const runs = visitors.get(key) ?? 0;
      if (runs >= limit) return false;
      visitors.set(key, runs + 1);
      return true;
    },
    async reserve({ day, month }, micro, caps) {
      const dayTotal = (spend.get(day) ?? 0) + micro;
      const monthTotal = (spend.get(month) ?? 0) + micro;
      if (dayTotal > caps.day || monthTotal > caps.month) return false;
      spend.set(day, dayTotal);
      spend.set(month, monthTotal);
      return true;
    },
    async settle({ day, month }, reservedMicro, actualMicro) {
      for (const period of [day, month]) {
        spend.set(period, Math.max(0, (spend.get(period) ?? 0) - reservedMicro + actualMicro));
      }
    },
    async prune(beforeDay) {
      for (const key of visitors.keys()) {
        if (key.split('|')[0] < beforeDay) visitors.delete(key);
      }
    },
    spendFor: (period) => spend.get(period) ?? 0,
  };
}
