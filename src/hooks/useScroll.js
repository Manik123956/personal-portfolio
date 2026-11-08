import { useScroll } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return { scrollYProgress };
}

export function useScrollProgressTop() {
  const { scrollY } = useScroll();
  return scrollY;
}

export function useReveal() {
  return useReducedMotion();
}