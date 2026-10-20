/**
 * A product screenshot in a light browser frame. `phone` (optional) overlaps the
 * bottom-right corner on wide screens and sits beside it on phones.
 */
export default function BrowserShot({ shot, phone, isEager = false }) {
  return (
    <figure className="shot">
      <div className="shot-frame">
        <span className="shot-bar" aria-hidden="true"><i /><i /><i /></span>
        <img
          src={shot.src}
          alt={shot.label}
          width={shot.w}
          height={shot.h}
          loading={isEager ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      {phone && (
        <img
          src={phone.src}
          alt={phone.label}
          width={phone.w}
          height={phone.h}
          loading="lazy"
          decoding="async"
          className="shot-phone"
        />
      )}
      <figcaption className="mt-3 text-sm font-medium leading-snug text-muted">{shot.label}</figcaption>
    </figure>
  );
}
