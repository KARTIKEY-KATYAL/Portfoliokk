"use client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import React from "react";

/**
 * Central animation provider:
 * - Lazy loads only the minimal DOM animation features (shrinks framer-motion bundle)
 * - Respects user prefers-reduced-motion automatically (MotionConfig reducedMotion="user")
 */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
};
