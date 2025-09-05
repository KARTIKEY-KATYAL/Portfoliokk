"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BoxesProps {
  className?: string;
  /** Number of rows (default 40) */
  rowCount?: number;
  /** Number of columns (default 50) */
  colCount?: number;
  /** Custom color palette for hover */
  colors?: string[];
  /** Whether to render the plus icons (default true) */
  showIcons?: boolean;
  /** Scale factor to shrink / grow the grid (default 0.675) */
  scale?: number;
}

export const BoxesCore = ({
  className,
  rowCount = 40,
  colCount = 50,
  colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd",
  ],
  showIcons = true,
  scale = 0.675,
  ...rest
}: BoxesProps) => {
  // Memoize arrays to avoid re-renders cost
  const rows = useMemo(() => new Array(rowCount).fill(0), [rowCount]);
  const cols = useMemo(() => new Array(colCount).fill(0), [colCount]);
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(${scale}) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      aria-hidden
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-8 w-16 border-l border-slate-700/40 dark:border-slate-700"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              key={`col-${i}-${j}`}
              className="relative h-8 w-16 border-t border-r border-slate-700/40 dark:border-slate-700/60 transition-colors"
            >
              {showIcons && j % 4 === 0 && i % 4 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-600/60"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
