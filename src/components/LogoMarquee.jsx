/**
 * Two-row infinite logo carousel.
 * Top row scrolls LEFT (translateX 0 → -50%).
 * Bottom row scrolls RIGHT (translateX -50% → 0).
 * Hovering anywhere pauses both rows.
 * Uses Simple Icons CDN for brand-color SVGs.
 */

const TOOL_LOGOS = [
  { name: 'GoHighLevel',     slug: null,            initials: 'GHL', color: '#8B5CF6' },
  { name: 'Cloudflare',      slug: 'cloudflare',    color: 'F38020' },
  { name: 'HubSpot',         slug: 'hubspot',       color: 'FF7A59' },
  { name: 'Mailchimp',       slug: 'mailchimp',     color: 'FFE01B' },
  { name: 'Zapier',          slug: 'zapier',        color: 'FF4A00' },
  { name: 'n8n',             slug: 'n8n',           color: 'EA4B71' },
  { name: 'Make',            slug: null,            initials: 'MK', color: '#6D00CC' },
  { name: 'WordPress',       slug: 'wordpress',     color: '21759B' },
  { name: 'Wix',             slug: 'wix',           color: '0C6EFC' },
  { name: 'Squarespace',     slug: null,            initials: 'SQ',  color: '#000000' },
  { name: 'React',           slug: 'react',         color: '61DAFB' },
  { name: 'Tailwind CSS',    slug: 'tailwindcss',   color: '06B6D4' },
  { name: 'Vite',            slug: 'vite',          color: '646CFF' },
  { name: 'GitHub',          slug: 'github',        color: '181717' },
];

const TOOL_LOGOS_2 = [
  { name: 'HTML5',           slug: 'html5',         color: 'E34F26' },
  { name: 'CSS3',            slug: 'css',           color: '1572B6' },
  { name: 'JavaScript',      slug: 'javascript',    color: 'F7DF1E' },
  { name: 'ClickUp',         slug: 'clickup',       color: '7B68EE' },
  { name: 'Notion',          slug: 'notion',        color: '000000' },
  { name: 'Google Workspace',slug: 'google',        color: '4285F4' },
  { name: 'Mailgun',         slug: 'mailgun',       color: 'F06B66' },
  { name: 'Stripe',          slug: 'stripe',        color: '635BFF' },
  { name: 'Square',          slug: 'square',        color: '3E4348' },
  { name: 'PayPal',          slug: 'paypal',        color: '003087' },
  { name: 'Figma',           slug: 'figma',         color: 'F24E1E' },
  { name: 'Canva',           slug: null,            initials: 'CV',  color: '#00C4CC' },
  { name: 'Apps Script',     slug: 'googleappsscript', color: '4285F4' },
  { name: 'Search Console',  slug: 'googlesearchconsole', color: '458CF5' },
  { name: 'A2P SMS',         slug: null,            initials: 'A2P', color: '#16A34A' },
  { name: 'SEO',             slug: null,            initials: 'SEO', color: '#0F4C81' },
];

function ToolChip({ tool }) {
  return (
    <div className="inline-flex items-center gap-3 bg-white border border-line rounded-2xl px-5 py-3.5 mx-2 shadow-sm hover:shadow-soft hover:-translate-y-0.5 transition-all whitespace-nowrap select-none">
      {tool.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color || '64748b'}`}
          alt={tool.name}
          className="w-6 h-6"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ) : (
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-extrabold text-white"
          style={{ background: tool.color || '#0F4C81' }}
          aria-label={tool.name}
        >
          {tool.initials}
        </div>
      )}
      <span className="font-semibold text-ink text-sm">{tool.name}</span>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left' }) {
  // Duplicate the items so the loop is seamless
  const doubled = [...items, ...items];
  const trackClass = direction === 'right' ? 'marquee-track-right' : 'marquee-track-left';
  return (
    <div className="overflow-hidden marquee-mask">
      <div className={`flex ${trackClass}`} style={{ width: 'max-content' }}>
        {doubled.map((tool, i) => (
          <ToolChip key={`${tool.name}-${direction}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div className="marquee-wrap space-y-3">
      <MarqueeRow items={TOOL_LOGOS} direction="left" />
      <MarqueeRow items={TOOL_LOGOS_2} direction="right" />
    </div>
  );
}
