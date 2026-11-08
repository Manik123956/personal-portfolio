import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Send, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useScroll';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const reduced = useReveal();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  const reveal = (i) => reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-label"><span>06</span> Contact</div>
        <h2 className="section-title">Let's Work<br /><em>Together.</em></h2>

        <div className="contact-grid">
          <motion.div
            initial={reveal(0)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-left"
          >
            <p>
              I'm actively looking for Backend / Full-Stack opportunities. If you have a role
              that fits, or just want to connect — my inbox is always open.
            </p>
            <div className="contact-items">
              <a href={`mailto:${portfolioData.email}`} className="contact-item">
                <Mail size={18} /> {portfolioData.email}
              </a>
              <a href={`tel:${portfolioData.phone}`} className="contact-item">
                <Phone size={18} /> {portfolioData.phone}
              </a>
              <a href={portfolioData.github} target="_blank" rel="noopener" className="contact-item">
                <Github size={18} /> Manik123956
              </a>
              <a href={portfolioData.linkedin} target="_blank" rel="noopener" className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
                maniklal-mandal
              </a>
              <div className="contact-item no-link">
                <MapPin size={18} /> Kolkata, West Bengal, India
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reveal(1)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-form-wrap"
          >
            <form className="contact-form" id="contact-form" onSubmit={onSubmit} novalidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cf-subject">Subject</label>
                <input
                  id="cf-subject"
                  type="text"
                  placeholder="Job opportunity / Collaboration"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cf-msg">Message</label>
                <textarea
                  id="cf-msg"
                  rows="5"
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <Send size={16} /> Send Message
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="form-success"
                  >
                    <CheckCircle size={18} /> Message received! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="form-note">
                Note: This form is UI-only — no backend is connected. Your message will not be
                sent. Please use the email address above to reach me directly.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}