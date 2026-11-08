import { Github, Mail, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <a href="#home" className="nav-logo">MM<span className="dot">.</span></a>
          <p>Full-Stack Developer · Kolkata, India</p>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#achievements">Achievements</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-socials">
          <a href={portfolioData.github} target="_blank" rel="noopener" title="GitHub"><Github size={18} /></a>
          <a href={portfolioData.leetcode} target="_blank" rel="noopener" title="LeetCode"><Code2 size={18} /></a>
          <a href={portfolioData.linkedin} target="_blank" rel="noopener" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href={`mailto:${portfolioData.email}`} title="Email"><Mail size={18} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Maniklal Mondal. Crafted with <span>❤</span> in Kolkata.</p>
      </div>
    </footer>
  );
}