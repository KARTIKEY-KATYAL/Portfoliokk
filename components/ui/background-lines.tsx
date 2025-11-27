"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children?: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "h-full w-full bg-background relative flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <SVG
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        svgOptions={svgOptions}
      />
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
};

const SVG = ({
  className,
  svgOptions,
}: {
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  const paths = [
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
    "M-800 0h1600V1600H-800z",
  ];

  const colors = [
    "var(--primary)",
    "var(--primary)",
    "var(--primary)",
    "var(--primary)",
    "var(--primary)",
    "var(--primary)",
  ];

  return (
    <motion.svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("absolute inset-0 w-full h-full", className)}
    >
      {paths.map((path, idx) => (
        <motion.path
          key={`path-${idx}`}
          d={path}
          stroke={colors[idx % colors.length]}
          strokeWidth="2.5"
          strokeOpacity="0.1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: svgOptions?.duration || 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            },
          }}
        />
      ))}
    </motion.svg>
  );
};
