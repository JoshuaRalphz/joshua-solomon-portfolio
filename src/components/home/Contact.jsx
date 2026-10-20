import { Download, FileText, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Reveal } from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import ContactForm from './ContactForm.jsx';
import { PROJECT_HASH, profile } from '../../data/content.js';

const DIRECT_CONTACTS = [
  { Icon: Mail, label: 'Email · replies within 24h', value: profile.email, href: `mailto:${profile.email}` },
  { Icon: MessageCircle, label: 'WhatsApp · fastest channel', value: profile.whatsapp, href: profile.whatsappLink },
  { Icon: Linkedin, label: 'LinkedIn', value: profile.name, href: profile.linkedin },
  { Icon: Github, label: 'GitHub', value: profile.handle, href: profile.github },
];

function ContactRow({ Icon, label, value, href }) {
  const isExternal = href.startsWith('http');
  return (
    <li>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="relative flex min-h-[3.5rem] items-center gap-3 rounded-inner border border-mist-dim/25 bg-ink-2 px-4 py-2.5 transition-colors hover:border-mist-dim"
      >
        <Icon size={18} aria-hidden="true" className="flex-none text-mist-dim" />
        <span className="min-w-0">
          <span className="block text-[.8125rem] font-medium leading-snug text-mist-dim">{label}</span>{' '}
          <span className="wrap-anywhere block text-sm font-semibold leading-snug text-mist">{value}</span>
        </span>
        {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </li>
  );
}

/** End of the path: one ink panel with the form and every direct channel. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="tile tile--ink">
      <div className="on-ink">
        <SectionHead
          id="contact"
          label="Contact"
          title="Hiring, or a project for your business?"
          intro="Hiring: I’m available for full-time remote work and can start within 1–2 weeks of an offer. Running a business: pick “A project for my business” and tell me the busywork. I reply within 24 hours. References available on request."
        />
      </div>

      <Reveal className="split split--rev">
        {/* The form card is deliberately outside .on-ink so its focus rings stay ink.
            The id is the "Ask for a free call" target: it lands here with the business topic picked. */}
        <div id={PROJECT_HASH.slice(1)}>
          <ContactForm />
        </div>

        <div className="on-ink">
          <h3 className="label">Or reach me directly</h3>
          <ul className="mt-3 space-y-2.5">
            {DIRECT_CONTACTS.map((contact) => <ContactRow key={contact.label} {...contact} />)}
            <li>
              <a
                href={profile.resumeUrl}
                download
                className="flex min-h-[3.5rem] items-center gap-3 rounded-inner bg-lime px-4 py-2.5 text-ink transition-colors hover:bg-lime-deep"
              >
                <FileText size={18} aria-hidden="true" className="flex-none" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[.8125rem] font-medium leading-snug">Resume</span>
                  <span className="block text-sm font-semibold leading-snug">Download .pdf</span>
                </span>
                <Download size={18} aria-hidden="true" className="flex-none" />
              </a>
            </li>
          </ul>
          <p className="mt-5 border-t border-mist-dim/25 pt-4 text-sm leading-relaxed text-mist-dim">
            <strong className="block font-semibold text-mist">Working hours</strong>
            US Eastern preferred; PH, AU or European hours also work. I reply within 24 hours.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
