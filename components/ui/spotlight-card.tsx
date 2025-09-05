"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number;
  intensity?: number;
}

export function SpotlightCard({
  className,
  children,
  radius = 180,
  intensity = 0.35,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0, opacity: 0 });
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPos({ x, y, opacity: 1 });
      }}
      onPointerLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      className={cn(
        "group relative rounded-2xl border border-border/40 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-xl overflow-hidden",
        "transition-shadow duration-300 hover:shadow-[0_0_0_1px_hsl(var(--primary))]",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, hsl(var(--primary)/${intensity}) 0%, transparent ${radius}px)`,
          opacity: pos.opacity,
        }}
      />
      <div className="relative z-10 p-6">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  );
}
