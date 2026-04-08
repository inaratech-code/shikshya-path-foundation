import type { Transition, Variants } from 'framer-motion';

/** Premium SaaS–style easing (close to cubic-bezier(0.22, 1, 0.36, 1)). */
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const duration = {
  fast: 0.22,
  base: 0.35,
  slow: 0.5,
  slower: 0.65,
} as const;

export const transition: Transition = {
  duration: duration.base,
  ease: easeOutExpo,
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalPanel: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.98 },
};
