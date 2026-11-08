import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Folder, Star, GitBranch } from 'lucide-react';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

const REPO_MAP = {
  'CRUD Web Application': 'crud-operation',
  'URL Shortener': 'UrlShortner',
  'AI Virtual Assistant': 'Vartual-AiAssistant',
};

export default function Projects() {
  const [repos, setRepos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reduced = useReveal();

  useEffect(() => {
    let cancelled = false;
    const fetchRepo = async (name) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${name}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    };
    (async () => {
      const entries = await Promise.all(
        Object.values(REPO_MAP).map(async (name) => {
          const data = await fetchRepo(name);
          return [name, data];
        })
      );
      if (!cancelled) {
        const map = {};
        entries.forEach(([name, data]) => { if (data) map[name] = data; });
        setRepos(map);
        setLoading(false);
        setError(Object.keys(map).length === 0);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const reveal = (i) => reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 40, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-label"><span>03</span> Projects</div>
        <h2 className="section-title">Things I've<br /><em>Built.</em></h2>

        <div className="projects-grid">
          {portfolioData.projects.map((project, i) => {
            const repoName = REPO_MAP[project.title];
            const repo = repos[repoName];
            return (
              <motion.div
                key={project.title}
                initial={reveal(i)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="project-card"
              >
                <div className="project-num">{String(i + 1).padStart(2, '0')}</div>

                <div className="project-header">
                  <div className="project-icon">
                    {i === 0 ? '📋' : i === 1 ? '🔗' : '🤖'}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      title="GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {repo && (
                  <div className="repo-stats">
                    <span><Star size={13} /> {repo.stargazers_count || 0}</span>
                    <span><GitBranch size={13} /> {repo.forks_count || 0}</span>
                    <span><Code2 size={13} /> {repo.language || '—'}</span>
                  </div>
                )}

                <div className="project-footer">
                  <span className="project-cat">Full-Stack</span>
                  <a href={project.github} target="_blank" rel="noopener" className="project-link">
                    GitHub <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="projects-cta"
        >
          <a href={portfolioData.github} target="_blank" rel="noopener" className="btn btn-ghost">
            <Github size={18} /> View All Repositories <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}