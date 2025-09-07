"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
  delay?: number;
  y?: number;
  variants?: Variants;
}

/**
 * Lightweight scroll-reveal wrapper used for subtle fade/slide-in.
 */
export const Reveal: React.FC<RevealProps> = (props) => {
  const {
    as: Tag = 'div',
    className,
    once = true,
    delay = 0,
    y = 22,
    variants,
    children,
    ...rest
  } = props;
  const base: Variants = variants || {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { delay } }
  };

  // Render motion(Tag) for proper polymorphism
  // Cast with generics to avoid any usage while keeping flexibility
  const MotionTag = motion(Tag as React.ElementType);
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.22 }}
      variants={base}
      className={cn('will-change-transform', className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;