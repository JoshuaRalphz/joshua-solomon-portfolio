import { useState } from 'react';
import { Ban, Check, Clock, Copy, Pause, Play, Webhook } from 'lucide-react';
import { PIPELINE, STAGES, WEBHOOK_URL } from '../../../functions/_lib/demo/clinicShared.js';
import { INTENT_LABEL, TREATMENT_LABEL } from './TriagePanel.jsx';

const STATUS = {
  run: { label: 'Runs now', Icon: Play },
  wait: { label: 'Waits for approval', Icon: Pause },
  later: { label: 'Runs later', Icon: Clock },
  skip: { label: 'Skipped', Icon: Ban },
  done: { label: 'Sent (simulated)', Icon: Check },
  dropped: { label: 'Discarded', Icon: Ban },
};

function Board({ result, name, stage }) {
  return (
    <div className="tile min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="label"><span className="label-num">04</span> Opportunity · {PIPELINE} pipeline</h3>
        {!stage && <p className="text-sm font-bold text-danger">Not added: filtered out</p>}
      </div>
      <ol className="cl-board mt-4" aria-label={`${PIPELINE} pipeline stages`}>
        {STAGES.map((s) => {
          const here = s.id === stage;
          return (
            <li key={s.id} className="cl-col" data-here={here}>
              <p className="cl-col-head">{s.label}{here && <span className="sr-only"> (this lead is here)</span>}</p>
              {here ? (
                <div className="cl-card" key={`${s.id}-card`}>
                  <p className="font-bold text-ink">{name}</p>
                  <p className="text-xs text-body">{TREATMENT_LABEL[result.treatment]} · {INTENT_LABEL[result.intent]}</p>
                  <p className="mt-1.5 flex flex-wrap gap-1">
                    <span className="cl-pill" data-temp={result.ghl.temperature}>{result.ghl.temperature}</span>
                    {result.needs_nurse && <span className="cl-pill" data-temp="nurse">nurse</span>}
                    <span className="cl-pill">score {result.lead_score}</span>
                  </p>
                </div>
              ) : <div className="cl-empty" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Steps({ steps, decision }) {
  return (
    <div className="tile min-w-0">
      <h3 className="label"><span className="label-num">05</span> Workflow: “Website enquiry → triage”</h3>
      <ol className="cl-steps mt-4">
        {steps.map((s, i) => {
          const status = s.status === 'wait' && decision ? (decision === 'sent' ? 'done' : 'dropped') : s.status;
          const { label, Icon } = STATUS[status];
          return (
            <li key={s.id} data-status={status}>
              <span className="cl-step-node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-bold text-ink">
                  {s.label}
                  <span className="cl-status" data-status={status}><Icon size={12} aria-hidden="true" /> {label}</span>
                </p>
                <p className="cl-step-detail">{status === 'done' ? 'Approved by a person. Nothing really left this page.' : status === 'dropped' ? 'Discarded by staff: the front desk answers by hand.' : s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Payload({ payload }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(payload, null, 2);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="tile tile--ink on-ink min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="label flex items-center gap-2"><Webhook size={14} aria-hidden="true" /> <span className="label-num">06</span> Webhook payload into GoHighLevel</h3>
        <button type="button" className="btn cl-btn-ghost min-h-[2.75rem] px-4 text-sm" onClick={copy}>
          <Copy size={15} aria-hidden="true" /> {copied ? 'Copied' : 'Copy JSON'}
        </button>
      </div>
      <p className="mt-3 break-all font-mono text-xs text-lime">POST {WEBHOOK_URL}</p>
      <p className="mt-1 text-sm text-mist-dim">An Inbound Webhook trigger in a GoHighLevel workflow. Placeholder IDs: this demo never calls GoHighLevel.</p>
      <pre className="cl-json mt-3" tabIndex={0} aria-label="Webhook JSON payload"><code>{json}</code></pre>
    </div>
  );
}

/** Where the lead lands in GoHighLevel, the workflow steps, and the payload. All decided by code. */
export default function GhlPanel({ result, name, decision }) {
  const approved = decision === 'sent';
  const { stage } = result.ghl;
  const shownStage = approved && stage === 'new_lead' ? 'contacted' : stage;
  return (
    <section aria-labelledby="ghl-title" className="mt-[var(--section)]">
      <p className="label"><span className="label-num">GoHighLevel side</span> · decided by code, not by the model</p>
      <h2 id="ghl-title" className="t-h2 mt-2">What fires in the CRM</h2>
      <p className="intro mt-3">
        Claude only classifies and drafts. Plain code turns that into tags, a pipeline stage and workflow steps, so the same
        enquiry always routes the same way. {approved && stage === 'new_lead' && 'After approval the lead has moved to “Contacted”.'}
      </p>
      <div className="mt-5 grid gap-[var(--gap)]">
        <Board result={result} name={name} stage={shownStage} />
        <div className="cl-ghl-split">
          <Steps steps={result.ghl.steps} decision={decision} />
          <Payload payload={result.ghl.payload} />
        </div>
      </div>
    </section>
  );
}
