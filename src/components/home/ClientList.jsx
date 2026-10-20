import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { clientWork } from '../../data/content.js';

/** Supporting client work: one dense list, outcomes first, no big website screenshots. */
export default function ClientList() {
  return (
    <div className="tile">
      <h3 className="label">Also shipped for clients · supporting work</h3>
      <ul className="clients mt-4">
        {clientWork.map((client) => (
          <li key={client.name}>
            <p className="font-bold leading-snug text-ink">
              {client.url ? (
                <a href={client.url} target="_blank" rel="noopener noreferrer" className="client-link">
                  {client.name}
                  <ArrowUpRight size={15} aria-hidden="true" className="flex-none text-action" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : client.name}
              <span className="font-medium text-muted"> · {client.place}</span>
            </p>
            <p className="mt-1 text-sm leading-snug text-body">{client.line}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-start gap-2 text-sm font-medium leading-snug text-muted">
        <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 flex-none text-action" />
        Delivered under Arrow Group Consulting (Michigan, USA), shown with permission · references on request
      </p>
    </div>
  );
}
