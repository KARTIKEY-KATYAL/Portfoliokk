"use client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import React from "react";

/**
 * Central animation provider:
 * - Lazy loads only the minimal DOM animation features (shrinks framer-motion bundle)
 * - Respects user prefers-reduced-motion automatically (MotionConfig reducedMotion="user")
 */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Global spring tuning chosen for soft, responsive feel.
   * Can be overridden per component; keeps consistency.
   */
  const transition = {
    type: "spring" as const,
    stiffness: 210,
    damping: 28,
    mass: 0.9
  };
  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
};
