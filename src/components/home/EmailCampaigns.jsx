import { lazy, Suspense, useRef, useState } from 'react';
import { Eye } from 'lucide-react';
import { emailCampaigns } from '../../data/content.js';

// The preview dialog is only fetched the first time someone opens an email.
const EmailPreview = lazy(() => import('./EmailPreview.jsx'));

function CampaignCard({ email, onOpen }) {
  return (
    <li>
      <button type="button" className="ec-card" onClick={(event) => onOpen(email, event.currentTarget)}>
        <span className="gfx-thumb ec-thumb">
          <img
            src={`/work/emails/${email.img}-thumb.webp`}
            alt=""
            width={560}
            height={700}
            loading="lazy"
            decoding="async"
          />
          <span className="ec-chip" aria-hidden="true"><Eye size={14} /> Preview</span>
        </span>
        <span className="mt-2.5 block text-sm font-bold leading-snug text-ink">
          <span className="sr-only">Preview the email: </span>{email.client}
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-body">{email.subject}</span>
        <span className="mt-1.5 block font-mono text-xs leading-relaxed text-muted">
          {email.date} · sent to {email.audience || `${email.delivered} inboxes`}
        </span>
      </button>
    </li>
  );
}

/** Email campaigns Joshua built and launched; each card opens a desktop/phone preview. */
export default function EmailCampaigns() {
  const [openEmail, setOpenEmail] = useState(null);
  const triggerRef = useRef(null);

  const open = (email, trigger) => {
    triggerRef.current = trigger;
    setOpenEmail(email);
  };
  const close = () => {
    setOpenEmail(null);
    triggerRef.current?.focus();
  };

  return (
    <article id="work-emails" className="tile case" aria-labelledby="emails-title">
      <p className="label"><span className="label-num">03</span> {emailCampaigns.kicker}</p>
      <h4 id="emails-title" className="t-h2 mt-3">{emailCampaigns.title}</h4>
      <p className="t-outcome t-outcome--sm mt-3">{emailCampaigns.outcome}</p>
      <p className="mt-2 font-mono text-xs font-medium uppercase tracking-wider text-action">{emailCampaigns.totals}</p>
      <ul className="gfx mt-5">
        {emailCampaigns.items.map((email) => <CampaignCard key={email.img} email={email} onOpen={open} />)}
      </ul>
      {openEmail && (
        <Suspense fallback={null}>
          <EmailPreview email={openEmail} onClose={close} />
        </Suspense>
      )}
    </article>
  );
}
