"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] gap-6 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
  href,
  title,
  description,
  icon,
}: {
  className?: string;
  children?: React.ReactNode;
  colSpan?: number | string;
  rowSpan?: number | string;
  href?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-card/70 p-6 backdrop-blur-xl transition-all",
        "hover:shadow-[0_0_0_1px_hsl(var(--primary))]",
        `col-span-${colSpan} row-span-${rowSpan}`,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-4">
        {icon && (
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/30">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold leading-tight tracking-tight">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
    </Comp>
  );
}
