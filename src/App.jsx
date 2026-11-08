import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import './styles/App.css';

function App() {
  useEffect(() => {
    document.title = 'Maniklal Mondal — Full-Stack Developer';
  }, []);

  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;