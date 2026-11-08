import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

const info = [
  { icon: '🎓', label: 'Education', value: 'B.Tech — CSE', sub: '2024–2028 · CGPA 7.3' },
  { icon: '📍', label: 'Location', value: 'Kolkata, West Bengal', sub: 'India' },
  { icon: '✉️', label: 'Email', value: portfolioData.email, sub: 'Available for opportunities' },
  { icon: '📞', label: 'Phone', value: portfolioData.phone, sub: 'WhatsApp / Call' },
];

export default function About() {
  const reduced = useReveal();
  const reveal = (i, d = 0.6) => reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 40, transition: { duration: d, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="about" className="about section">
      <div className="container about-grid">
        <motion.div
          initial={reveal(0)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="about-text"
        >
          <div className="section-label"><span>01</span> About</div>
          <h2 className="section-title">Building the Web<br /><em>from the inside out.</em></h2>
          <p>
            I'm a third -year B.Tech Computer Science Engineering student at{' '}
            <strong>Techno Main Salt Lake</strong>, deeply passionate
            about backend engineering and full-stack development.
          </p>
          <p>
            My focus is on designing and building the server-side systems that power modern
            applications — from clean REST APIs and authentication flows to real-time Socket.io
            features. I've built a CRUD web application, a URL shortener with click analytics,
            and a voice-controlled AI assistant.
          </p>
          <p>
            With <strong>150+ problems solved</strong> on competitive programming platforms and a
            strong algorithmic mindset, I bring rigorous problem-solving to every project. I'm
            actively seeking Backend or Full-Stack roles where I can contribute meaningfully
            and grow fast.
          </p>
          <div className="about-info">
            {info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={reveal(i)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="info-item"
              >
                <span className="info-emoji">{item.icon}</span>
                <div>
                  <span>{item.value}</span>
                  <small>{item.sub}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reveal(1)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="about-visual"
        >
          <div className="terminal">
            <div className="terminal-bar">
              <span className="tb-dot red" />
              <span className="tb-dot yellow" />
              <span className="tb-dot green" />
              <span className="tb-title">maniklal@dev:~</span>
            </div>
            <div className="terminal-body">
              <p className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">whoami</span></p>
              <p className="t-output">Maniklal Mondal — Full-Stack Developer</p>
              <p className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">cat skills.txt</span></p>
              <p className="t-output">Node.js · Express · MongoDB · REST APIs</p>
              <p className="t-output">Socket.io · SQL · Git · Linux</p>
              <p className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">echo $STATUS</span></p>
              <p className="t-output t-green">Open to opportunities ✓</p>
              <p className="t-line"><span className="t-prompt">$</span><span className="t-cursor">_</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}