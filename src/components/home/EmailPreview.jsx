import { useEffect, useId, useRef, useState } from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

const VIEWS = [
  { id: 'desktop', label: 'Desktop', Icon: Monitor },
  { id: 'phone', label: 'Phone', Icon: Smartphone },
];

/**
 * Full-height email preview, like the platform's own preview: a Desktop / Phone toggle and the
 * render inside a simple device frame. A native modal <dialog> keeps focus inside and closes on
 * Esc; the opener returns focus to the card.
 */
export default function EmailPreview({ email, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const titleId = useId();
  // Phones start on the phone view: a 600px email would be shrunk to fit.
  const [view, setView] = useState(() => (window.matchMedia('(max-width: 639.98px)').matches ? 'phone' : 'desktop'));

  useEffect(() => {
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    if (!dialog.open) dialog.showModal(); // StrictMode runs this effect twice in dev
    closeRef.current.focus();
    root.style.overflow = 'hidden';
    const handleClose = () => onCloseRef.current();
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
      root.style.overflow = previousOverflow;
    };
  }, []);

  const isPhone = view === 'phone';
  const image = isPhone
    ? { src: `/work/emails/${email.img}-phone.webp`, w: 375, h: email.phoneH }
    : { src: `/work/emails/${email.img}-desktop.webp`, w: 600, h: email.desktopH };

  return (
    // Clicks on the backdrop land on the <dialog> itself.
    <dialog
      ref={dialogRef}
      className="ep"
      aria-labelledby={titleId}
      onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}
    >
      <div className="ep-panel">
        <header className="ep-head">
          <div className="min-w-0">
            <p className="label">{email.client}</p>
            <h2 id={titleId} className="ep-title">{email.subject}</h2>
            <p className="mt-1 font-mono text-xs text-muted">{email.date} · sent to {email.audience || `${email.delivered} inboxes`}</p>
          </div>
          <div className="ep-tools">
            <div className="seg" role="group" aria-label="Preview size">
              {VIEWS.map(({ id, label, Icon }) => (
                <button key={id} type="button" className="seg-btn" aria-pressed={view === id} onClick={() => setView(id)}>
                  <Icon size={16} aria-hidden="true" />{label}
                </button>
              ))}
            </div>
            <button ref={closeRef} type="button" className="ep-close" aria-label="Close preview" onClick={() => dialogRef.current.close()}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="ep-stage">
          <div className={isPhone ? 'ep-phone' : 'ep-desktop'}>
            {isPhone ? (
              <span className="ep-notch" aria-hidden="true" />
            ) : (
              <div className="ep-chrome" aria-hidden="true">
                <span className="shot-bar"><i /><i /><i /></span>
                <p className="ep-meta"><b>{email.client}</b><span>{email.subject}</span></p>
              </div>
            )}
            {/* Focusable so keyboard users can scroll the email. */}
            <div key={view} className="ep-scroll" tabIndex={0} role="region" aria-label={`${isPhone ? 'Phone' : 'Desktop'} view of the email, scroll to read`}>
              <img
                src={image.src}
                alt={`The full ${email.client} email “${email.subject}”, as it shows on ${isPhone ? 'a phone' : 'desktop'}`}
                width={image.w}
                height={image.h}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
