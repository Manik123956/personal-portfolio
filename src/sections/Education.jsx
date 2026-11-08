import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const reduced = useReveal();
  const reveal = (i) => reduced
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: -40, transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="education" className="education section">
      <div className="container">
        <div className="section-label"><span>04</span> Education</div>
        <h2 className="section-title">Academic<br /><em>Journey.</em></h2>

        <div className="timeline">
          {portfolioData.education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={reveal(i)}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="timeline-item"
            >
              <div className="timeline-dot" />
              <div className="timeline-line" />
              <div className="timeline-card">
                <div className="timeline-head">
                  <span className="timeline-period">{edu.period}</span>
                  <span className="timeline-grade">
                    {edu.cgpa ? `CGPA ${edu.cgpa}/10` : `${edu.percentage}%`}
                  </span>
                </div>
                <h3 className="timeline-degree">{edu.degree}</h3>
                <p className="timeline-college">{edu.college}</p>
                {edu.location && <p className="timeline-loc">{edu.location}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}