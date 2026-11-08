import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Download, ArrowDown, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const TITLES = ['Full-Stack Developer', 'Backend Engineer', 'Problem Solver'];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, 120]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((s) => !s), 550);
    return () => clearInterval(id);
  }, []);

  // Typing / deleting effect
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timer;
    if (!isDeleting) {
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 90);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 45);
      } else {
        setTitleIndex((i) => (i + 1) % TITLES.length);
        setIsDeleting(false);
      }
    }
    return () => clearTimeout(timer);
  }, [typed, isDeleting, titleIndex]);

  const stats = useMemo(() => [
    { num: 150, suffix: '+', label: 'LeetCode Problems' },
    { num: 3, label: 'Projects Built' },
    { num: 7.3, suffix: '/10', label: 'CGPA' },
  ], []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow glow-1" />
      <div className="hero-glow glow-2" />

      <motion.div
        className="hero-content"
        style={{ y: parallax }}
      >
        <div className="hero-text">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-eyebrow"
          >
            <span className="eyebrow-line" />
            Available for Backend / Full-Stack Roles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hero-name"
          >
            <span className="line-reveal">Maniklal</span>
            <span className="line-reveal delay-1">Mondal<span className="dot">.</span></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-role"
          >
            <span className="role-tag">Full-Stack</span>
            <span className="role-sep">—</span>
            <span className="role-typed">
              {typed}
              <span className={`cursor ${showCursor ? 'on' : ''}`}>▋</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="hero-bio"
          >
            B.Tech Computer Science Engineering student at Techno Main Salt Lake.
            Building scalable server-side systems, RESTful APIs, and robust
            authentication flows with Node.js, Express.js, and MongoDB. 150+ DSA problems solved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hero-cta"
          >
            <a href="#projects" className="btn btn-primary">
              <ExternalLink size={16} /> View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">Let's Talk</a>
            <a href="/Maniklal_Mondal_Resume.pdf" download className="btn btn-ghost">
              <Download size={16} /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="hero-stats"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="stat">
                <span className="stat-num">{s.num}</span>
                {s.suffix && <span className="stat-plus">{s.suffix}</span>}
                <p>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-image-wrap"
        >
          <div className="hero-image-ring ring-outer" />
          <div className="hero-image-ring ring-mid" />
          <div className="hero-image-container">
            <img
              src="/profile-placeholder.jpg"
              alt="Maniklal Mondal"
              className="hero-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = e.currentTarget.parentElement.querySelector('.hero-img-fallback');
                if (fb) fb.style.display = 'flex';
              }}
            />
            <div className="hero-img-fallback" aria-hidden="true">
              <span>MM</span>
            </div>
          </div>
          <div className="hero-badge">
            <Code2 size={16} />
            <span>Full-Stack Dev</span>
          </div>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span>Scroll</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}