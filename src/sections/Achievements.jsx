import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, ExternalLink, Code2, Loader2 } from 'lucide-react';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const [lc, setLc] = useState(null);
  const [lcError, setLcError] = useState(false);
  const reduced = useReveal();

  useEffect(() => {
    let cancelled = false;
    const fetchLC = async () => {
      try {
        const res = await fetch(`https://leetcode-stats.app/api/${import.meta.env.VITE_LEETCODE_USERNAME}`);
        if (!res.ok) throw new Error('no');
        const data = await res.json();
        if (!cancelled) setLc(data);
      } catch {
        if (!cancelled) setLcError(true);
      }
    };
    fetchLC();
    return () => { cancelled = true; };
  }, []);

  const reveal = (i) => reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="achievements" className="achievements section">
      <div className="container">
        <div className="section-label"><span>05</span> Achievements</div>
        <h2 className="section-title">Milestones &amp;<br /><em>Hackathons.</em></h2>

        <div className="ach-grid">
          <motion.div
            initial={reveal(0)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ach-card ach-leetcodelike"
          >
            <div className="ach-top">
              <div className="ach-icon"><Code2 size={22} /></div>
              <span className="ach-badge">Coding</span>
            </div>
            <h3 className="ach-big">150+</h3>
            <p className="ach-sub">LeetCode Problems Solved</p>
            <div className="lc-stats">
              {lcError || !lc ? (
                <span className="lc-fallback">Live stats unavailable — confirmed 150+ problems solved</span>
              ) : lc.error ? (
                <span className="lc-fallback">Live stats unavailable — confirmed 150+ problems solved</span>
              ) : (
                <>
                  <div className="lc-stat"><span className="lc-easy">{lc.easySolved || 0}</span><small>Easy</small></div>
                  <div className="lc-stat"><span className="lc-med">{lc.mediumSolved || 0}</span><small>Medium</small></div>
                  <div className="lc-stat"><span className="lc-hard">{lc.hardSolved || 0}</span><small>Hard</small></div>
                  <div className="lc-stat"><span className="lc-total">{lc.totalSolved || 0}</span><small>Total</small></div>
                </>
              )}
            </div>
            <a href={portfolioData.leetcode} target="_blank" rel="noopener" className="ach-link">
              View LeetCode Profile <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={reveal(1)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ach-card"
          >
            <div className="ach-top">
              <div className="ach-icon"><Trophy size={22} /></div>
              <span className="ach-badge">Rank</span>
            </div>
            <h3 className="ach-big">Top 8%</h3>
            <p className="ach-sub">Ranked under 200 among 2500+ active college coders</p>
          </motion.div>

          {portfolioData.achievements
            .filter((a) => /hackfest|smart india hackathon|innovate/i.test(a))
            .map((a, i) => (
              <motion.div
                key={a}
                initial={reveal(i + 2)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="ach-card"
              >
                <div className="ach-top">
                  <div className="ach-icon"><Medal size={22} /></div>
                  <span className="ach-badge">Hackathon</span>
                </div>
                <h3 className="ach-title">{a}</h3>
                <p className="ach-sub">Built real-world solutions in a team under deadlines.</p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}