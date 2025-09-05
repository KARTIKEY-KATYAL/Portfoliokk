"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  disableBeams?: boolean;
  containerClassName?: string;
}

export function Section({
  id,
  className,
  children,
  disableBeams = false,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-20",
        className
      )}
      {...rest}
    >
      {!disableBeams && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
          <BackgroundBeams />
        </div>
      )}
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: React.ReactNode;
  highlight?: string; // substring to wrap with span
  description?: React.ReactNode;
  align?: "center" | "start";
  className?: string;
  motionOnce?: boolean;
}

export function SectionHeader({
  title,
  highlight,
  description,
  align = "center",
  className,
  motionOnce = true
}: SectionHeaderProps) {
  // Build highlighted title if highlight substring provided
  let renderedTitle = title;
  if (highlight && typeof title === "string" && title.includes(highlight)) {
    const parts = title.split(highlight);
    renderedTitle = (
      <>
        {parts[0]}
        <span className="text-primary">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: motionOnce, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className={cn(
        "mx-auto mb-16 max-w-3xl", // spacing & width
        align === "center" && "text-center",
        align === "start" && "text-left",
        className
      )}
    >
      <BackgroundGradient className="rounded-3xl border border-border/40 bg-background/70 p-8 md:p-10 backdrop-blur-xl">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          {renderedTitle}
        </h2>
        {description && (
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            align === "center" && "mx-auto max-w-2xl"
          )}>{description}</p>
        )}
      </BackgroundGradient>
    </motion.div>
  );
}

// Simple fade/slide variants helper (can be reused by sections)
export const fadeSlide = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 260, damping: 30 }
  }
});
