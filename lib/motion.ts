import { Variants } from 'framer-motion';

export const fadeStagger = (stagger = 0.08, delay = 0.05): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay }
  }
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 20 } }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 240, damping: 24 } }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 240, damping: 24 } }
};

export const fastFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } }
};

// Deluxe variants for richer subtle animation layering
export const fadeInSoft: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } }
};

export const growIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 240, damping: 30 }
  }
};

export const tiltIn: Variants = {
  hidden: { opacity: 0, rotateX: 12, y: 24, transformPerspective: 900 },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 32 }
  }
};

export const shimmerOnce: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, when: 'beforeChildren' }
  }
};

export const listStagger = (delayChildren = 0.15, stagger = 0.08): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren, staggerChildren: stagger }
  }
});

export const childFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export const subtleHover = {
  whileHover: { y: -4, scale: 1.012 },
  whileTap: { scale: 0.98 }
};

export const floatLoop: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: [0, -6, 0, -4, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const enterViewport = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { delay: i * 0.08 } }
});
