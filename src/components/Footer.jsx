import { Link } from 'react-router-dom';
import { Wordmark } from './Logo.jsx';
import { Mail, MessageCircle, Linkedin, Facebook } from 'lucide-react';
import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Wordmark size={32} light />
          <p className="mt-5 text-sm text-white/65 max-w-md leading-relaxed">
            One human technical operator. I build and maintain the marketing systems
            that keep agencies and service businesses running. Custom code, GoHighLevel,
            automation, and integrations — all in one retainer.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/works" className="hover:text-white transition-colors">Work</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/resume" className="hover:text-white transition-colors">Resume</Link></li>
            <li><Link to="/plan" className="hover:text-white transition-colors">Project planner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors break-all">
                <Mail size={14} className="flex-shrink-0" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.whatsappLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <MessageCircle size={14} className="flex-shrink-0" /> {profile.whatsapp}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin size={14} className="flex-shrink-0" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Facebook size={14} className="flex-shrink-0" /> Facebook · Messenger
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <div>© 2026 Joshua Solomon · CRM & Automation Specialist · Olongapo, PH · Working US hours</div>
          <div>Built from scratch · React · Hosted on Cloudflare Pages</div>
        </div>
      </div>
    </footer>
  );
}
