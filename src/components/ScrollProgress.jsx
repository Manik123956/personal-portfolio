import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScroll';

export default function ScrollProgress() {
  const { scrollYProgress } = useScrollProgress();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}