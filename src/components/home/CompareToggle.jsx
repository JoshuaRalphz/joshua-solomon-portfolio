import { useId } from 'react';
import { Check, Minus } from 'lucide-react';

const OPTIONS = [
  { value: 'before', label: 'By hand' },
  { value: 'after', label: 'With my system' },
];

/**
 * "By hand" vs "With my system" for one build. Native radios + CSS :has() (in
 * styles/signature.css), so it needs no JavaScript; without :has support both
 * lists simply show, one under the other.
 */
export default function CompareToggle({ before, after, title }) {
  const name = useId();

  return (
    <div className="compare mt-5 rounded-inner bg-sunk p-4">
      <fieldset>
        <legend className="label">Manual way vs my system<span className="sr-only">: {title}</span></legend>
        <div className="aud-switch aud-switch--sm mt-2">
          {OPTIONS.map((option) => (
            <label key={option.value}>
              <input type="radio" name={name} value={option.value} defaultChecked={option.value === 'after'} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <ul className="compare-before mt-3 space-y-2" aria-label="By hand">
        {before.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm font-medium leading-snug text-body">
            <Minus size={16} aria-hidden="true" className="mt-0.5 flex-none text-muted" />
            {line}
          </li>
        ))}
      </ul>
      <ul className="compare-after mt-3 space-y-2" aria-label="With my system">
        {after.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm font-medium leading-snug text-ink">
            <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
