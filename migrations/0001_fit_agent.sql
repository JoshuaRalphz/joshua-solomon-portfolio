-- Fit agent counters (functions/_lib/store.js). Nothing else is stored:
-- no job text, no raw IP addresses.

-- One row per visitor per UTC day. ip_hash = HMAC-SHA256(FIT_IP_SALT, day + IP).
-- Old days are deleted by the function itself (prune).
CREATE TABLE IF NOT EXISTS fit_visitors (
  day TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  runs INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, ip_hash)
);

-- Spend per period in micro-dollars: 'd:YYYY-MM-DD' (UTC day) and 'm:YYYY-MM' (UTC month).
CREATE TABLE IF NOT EXISTS fit_spend (
  period TEXT PRIMARY KEY,
  micro_usd INTEGER NOT NULL DEFAULT 0
);
