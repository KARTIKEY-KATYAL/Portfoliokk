"use client";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const count = number || 20;
  // Deterministic pseudo-random generator based on index so SSR & CSR match
  const meteors = useMemo(() => new Array(count).fill(0).map((_, i) => i), [count]);
  const prng = (seed: number) => {
    const x = Math.sin(seed * 9999.91) * 10000; // deterministic
    return x - Math.floor(x);
  };
  return (
    <>
      {meteors.map((idx) => {
        const left = Math.floor(prng(idx + 1) * 800 - 400); // -400..400
        const delay = (0.2 + prng(idx + 101) * 0.6).toFixed(3); // 0.2..0.8s
        const duration = Math.floor(2 + prng(idx + 202) * 8); // 2..9s
        return (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: left + "px",
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        ></span>
        );
      })}
    </>
  );
};