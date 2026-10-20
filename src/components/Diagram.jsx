/**
 * Architecture diagram as inline SVG, drawn from data (see src/data/cases.js).
 *
 * Two drawings of the same steps: a two-row "snake" for wide containers and a single
 * column for narrow ones. CSS container queries (.diagram in styles.css) show exactly
 * one, so the hidden one is also out of the accessibility tree. Each SVG carries a
 * <title> and a <desc> that reads every step in order.
 */

// Box look per kind. Text colours are AA on their own fill.
const KINDS = {
  input: { fill: '#FBFCF9', stroke: '#74907F', title: '#0D2B23', sub: '#4D685E', tag: '#0A6649' },
  ai: { fill: '#C9F26C', stroke: '#0D2B23', title: '#0D2B23', sub: '#17392F', tag: '#0D2B23' },
  code: { fill: '#E2EAE0', stroke: '#74907F', title: '#0D2B23', sub: '#2F4A41', tag: '#0A6649' },
  gate: { fill: '#0D2B23', stroke: '#0D2B23', title: '#EEF2EC', sub: '#A9C4B7', tag: '#C9F26C' },
  human: { fill: '#FBFCF9', stroke: '#0D2B23', title: '#0D2B23', sub: '#4D685E', tag: '#0A6649', dash: '6 5' },
};

export const LEGEND = [
  { kind: 'ai', label: 'AI step' },
  { kind: 'code', label: 'Code or data' },
  { kind: 'gate', label: 'Rule that blocks' },
  { kind: 'human', label: 'A person decides' },
  { kind: 'input', label: 'Input or output' },
];

/** Greedy word wrap by character count (good enough for short, known labels). */
function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const H = { width: 1000, pad: 6, gap: 32, rowGap: 60, inset: 14, tagY: 26, titleY: 52, titleLh: 21, subLh: 18, titleSize: 17, subSize: 14, titleChars: 15, subChars: 19 };
const V = { width: 340, pad: 4, gap: 30, inset: 16, tagY: 24, titleY: 48, titleLh: 21, subLh: 18, titleSize: 17, subSize: 14, titleChars: 28, subChars: 36 };

function boxHeight(node, g) {
  const titleLines = wrap(node.title, g.titleChars).length;
  const subLines = node.sub ? wrap(node.sub, g.subChars).length : 0;
  return g.titleY + (titleLines - 1) * g.titleLh + (subLines ? 8 + subLines * g.subLh : 0) + 16;
}

function Box({ node, x, y, w, h, g }) {
  const k = KINDS[node.kind] ?? KINDS.code;
  const titleLines = wrap(node.title, g.titleChars);
  const subLines = node.sub ? wrap(node.sub, g.subChars) : [];
  const subTop = y + g.titleY + (titleLines.length - 1) * g.titleLh + 8 + g.subLh;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={k.fill} stroke={k.stroke} strokeWidth="1.5" strokeDasharray={k.dash} />
      <text x={x + g.inset} y={y + g.tagY} fill={k.tag} className="dg-tag">{node.tag}</text>
      {titleLines.map((line, i) => (
        <text key={line} x={x + g.inset} y={y + g.titleY + i * g.titleLh} fill={k.title} fontSize={g.titleSize} fontWeight="700">{line}</text>
      ))}
      {subLines.map((line, i) => (
        <text key={line} x={x + g.inset} y={subTop + i * g.subLh} fill={k.sub} fontSize={g.subSize} fontWeight="500">{line}</text>
      ))}
    </g>
  );
}

function Markers({ id }) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#0D2B23" />
      </marker>
    </defs>
  );
}

function describe(diagram) {
  const steps = diagram.rows.flat().map((n, i) => `Step ${i + 1}, ${n.tag.toLowerCase()}: ${n.title}${n.sub ? ` (${n.sub})` : ''}.`);
  return `${steps.join(' ')} ${diagram.note ?? ''}`.trim();
}

function Horizontal({ id, diagram }) {
  const g = H;
  const cols = Math.max(...diagram.rows.map((row) => row.length));
  const w = (g.width - g.pad * 2 - g.gap * (cols - 1)) / cols;
  const rowH = diagram.rows.map((row) => Math.max(...row.map((n) => boxHeight(n, g))));
  const rowY = rowH.map((_, r) => g.pad + rowH.slice(0, r).reduce((sum, h) => sum + h + g.rowGap, 0));
  const height = rowY[rowY.length - 1] + rowH[rowH.length - 1] + g.pad;

  // Row 0 runs left to right; row 1 runs right to left, starting under row 0's last box.
  const place = (r, i) => (r % 2 === 0
    ? g.pad + i * (w + g.gap)
    : g.width - g.pad - w - i * (w + g.gap));

  const marker = `url(#${id}-h-arrow)`;
  const arrows = [];
  diagram.rows.forEach((row, r) => {
    row.forEach((_, i) => {
      if (i === row.length - 1) return;
      const y = rowY[r] + rowH[r] / 2;
      const [x1, x2] = r % 2 === 0
        ? [place(r, i) + w + 4, place(r, i + 1) - 4]
        : [place(r, i) - 4, place(r, i + 1) + w + 4];
      arrows.push(<line key={`a${r}-${i}`} x1={x1} y1={y} x2={x2} y2={y} stroke="#0D2B23" strokeWidth="2" markerEnd={marker} />);
    });
    if (r < diagram.rows.length - 1) {
      const lastX = place(r, row.length - 1) + w / 2;
      arrows.push(<line key={`d${r}`} x1={lastX} y1={rowY[r] + rowH[r] + 4} x2={lastX} y2={rowY[r + 1] - 4} stroke="#0D2B23" strokeWidth="2" markerEnd={marker} />);
    }
  });

  return (
    <svg className="dg-h" viewBox={`0 0 ${g.width} ${height}`} role="img" aria-labelledby={`${id}-h-t ${id}-h-d`}>
      <title id={`${id}-h-t`}>{diagram.title}</title>
      <desc id={`${id}-h-d`}>{describe(diagram)}</desc>
      <Markers id={`${id}-h`} />
      {arrows}
      {diagram.rows.map((row, r) => row.map((node, i) => (
        <Box key={node.title} node={node} x={place(r, i)} y={rowY[r]} w={w} h={rowH[r]} g={g} />
      )))}
    </svg>
  );
}

function Vertical({ id, diagram }) {
  const g = V;
  const nodes = diagram.rows.flat();
  const w = g.width - g.pad * 2;
  const heights = nodes.map((n) => boxHeight(n, g));
  const ys = heights.map((_, i) => g.pad + heights.slice(0, i).reduce((sum, h) => sum + h + g.gap, 0));
  const height = ys[ys.length - 1] + heights[heights.length - 1] + g.pad;
  const cx = g.width / 2;

  return (
    <svg className="dg-v" viewBox={`0 0 ${g.width} ${height}`} role="img" aria-labelledby={`${id}-v-t ${id}-v-d`}>
      <title id={`${id}-v-t`}>{diagram.title}</title>
      <desc id={`${id}-v-d`}>{describe(diagram)}</desc>
      <Markers id={`${id}-v`} />
      {nodes.slice(0, -1).map((node, i) => (
        <line key={`a${node.title}`} x1={cx} y1={ys[i] + heights[i] + 3} x2={cx} y2={ys[i + 1] - 3} stroke="#0D2B23" strokeWidth="2" markerEnd={`url(#${id}-v-arrow)`} />
      ))}
      {nodes.map((node, i) => (
        <Box key={node.title} node={node} x={g.pad} y={ys[i]} w={w} h={heights[i]} g={g} />
      ))}
    </svg>
  );
}

/** One swatch per kind, so meaning never rests on colour alone (each box also has a tag). */
function Legend() {
  return (
    <ul className="dg-legend" aria-label="Diagram key">
      {LEGEND.map(({ kind, label }) => {
        const k = KINDS[kind];
        return (
          <li key={kind}>
            <svg width="22" height="14" aria-hidden="true" focusable="false">
              <rect x="1" y="1" width="20" height="12" rx="4" fill={k.fill} stroke={k.stroke} strokeWidth="1.5" strokeDasharray={k.dash ? '3 2' : undefined} />
            </svg>
            {label}
          </li>
        );
      })}
    </ul>
  );
}

export default function Diagram({ id, diagram, showNote = true }) {
  return (
    <figure className="diagram">
      <Horizontal id={id} diagram={diagram} />
      <Vertical id={id} diagram={diagram} />
      <figcaption className="mt-4 flex flex-col gap-3">
        <Legend />
        {showNote && diagram.note && <p className="text-sm font-medium leading-snug text-body">{diagram.note}</p>}
      </figcaption>
    </figure>
  );
}
