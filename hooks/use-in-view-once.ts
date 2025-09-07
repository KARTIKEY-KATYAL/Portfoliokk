"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook that returns true once the element
 * has intersected the viewport threshold. Observer disconnects after first hit.
 */
export function useInViewOnce<T extends HTMLElement>(options: IntersectionObserverInit = { root: null, threshold: 0.15 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options.root, options.threshold, options.rootMargin, inView]);

  return { ref, inView } as const;
}
