import { useEffect, useState } from 'react';
import { Menu, X, Github, Mail, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = LINKS.map((l) => l.href.slice(1));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 120 <= window.scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smooth = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <div className="nav-brand">
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            MM<span className="dot">.</span>
          </a>
          <span className="nav-tagline">Full-Stack Developer · Kolkata, India</span>
        </div>

        <ul className="nav-links" id="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); smooth(l.href); }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-socials">
          <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={20} /></a>
          <a href="#skills" title="Tech Stack" onClick={(e) => { e.preventDefault(); smooth('#skills'); }}><Code2 size={20} /></a>
          <a href={portfolioData.linkedin} target="_blank" rel="noopener" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href="mailto:mm32748045@gmail.com" title="Email"><Mail size={18} /></a>
        </div>

        <button className="hamburger" id="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); smooth(l.href); }}>
            {l.label}
          </a>
        ))}
        <a href={portfolioData.github} target="_blank" rel="noopener">GitHub</a>
        <a href={portfolioData.leetcode} target="_blank" rel="noopener">LeetCode</a>
        <a href={portfolioData.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:mm32748045@gmail.com">Email</a>
      </div>
    </nav>
  );
}