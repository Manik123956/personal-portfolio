import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

const TABS = [
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'languages', label: 'Languages', icon: '⌨️' },
  { key: 'tools', label: 'Tools', icon: '🛠️' },
  { key: 'csFundamentals', label: 'CS Fundamentals', icon: '🧠' },
];

const ICONS = {
  'Node.js': '🟢',
  'Express.js': '⚡',
  'MongoDB': '🍃',
  'REST APIs': '🔁',
  'Authentication': '🔐',
  'Socket.io': 'Socket',
  'C': 'C',
  'C++': 'C++',
  'JavaScript': 'JS',
  'SQL': 'SQL',
  'Bash / Shell': '💻',
  'Linux (Ubuntu)': '🐧',
  'Git': 'Git',
  'GitHub': 'GitHub',
  'Postman': '📮',
  'VS Code': '💻',
  'Data Structures and Algorithms': '📐',
  'Object-Oriented Programming': '🧱',
  'DBMS': '🗄️',
  'Operating Systems': '🖥️',
  'Computer Networks': '🌐',
};

const LEVELS = {
  'Node.js': 88, 'Express.js': 85, 'MongoDB': 82, 'REST APIs': 90,
  'Authentication': 80, 'Socket.io': 75,
  'C': 80, 'C++': 78, 'JavaScript': 85, 'SQL': 82, 'Bash / Shell': 75,
  'Linux (Ubuntu)': 80, 'Git': 88, 'GitHub': 88, 'Postman': 82, 'VS Code': 90,
  'Data Structures and Algorithms': 85, 'Object-Oriented Programming': 82,
  'DBMS': 78, 'Operating Systems': 75, 'Computer Networks': 72,
};

export default function Skills() {
  const [tab, setTab] = useState('backend');
  const reduced = useReveal();
  const skills = portfolioData.skills[tab];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-label"><span>02</span> Skills</div>
        <h2 className="section-title">Tech Stack &amp;<br /><em>Proficiencies.</em></h2>

        <div className="skills-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <span className="tab-ic">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="skills-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="skill-grid"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="skill-card"
                  initial={reduced ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <div className="skill-icon">{ICONS[skill] || '✦'}</div>
                  <div className="skill-info">
                    <span>{skill}</span>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${LEVELS[skill] || 70}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.06 + 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}