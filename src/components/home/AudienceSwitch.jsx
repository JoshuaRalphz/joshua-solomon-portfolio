import { ArrowRight, Briefcase, Download, ShieldCheck, Store } from 'lucide-react';
import { audiences } from '../../data/content.js';

const ICONS = { recruiter: Briefcase, owner: Store, leader: ShieldCheck };

/**
 * "I'm a… recruiter / business owner / leader". Native radio inputs, so it works with
 * no JavaScript at all: CSS (:has, in styles/signature.css) shows the answer and the
 * second button for the checked one, and tags the matching Explore cards "For you".
 * Without :has support the switch hides itself and the recruiter text shows.
 */
export default function AudienceSwitch() {
  return (
    <div className="aud mt-6">
      <fieldset>
        <legend className="label">I’m a…</legend>
        <div className="aud-switch mt-2">
          {audiences.map(({ id, label }, i) => {
            const Icon = ICONS[id];
            return (
              <label key={id}>
                <input type="radio" name="aud" value={id} defaultChecked={i === 0} />
                <Icon size={16} aria-hidden="true" className="flex-none" />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {audiences.map(({ id, answer }) => (
          <p key={id} data-aud={id} className="mt-3 max-w-[60ch] font-semibold leading-snug text-ink">{answer}</p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <a href="#fit-agent" className="btn btn-primary">
          See how I’d help your team <ArrowRight size={18} aria-hidden="true" />
        </a>
        {audiences.map(({ id, cta }) => (
          <a
            key={id}
            data-aud={id}
            href={cta.href}
            download={cta.isDownload || undefined}
            className="btn btn-secondary"
          >
            {cta.isDownload && <Download size={18} aria-hidden="true" />}
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}
