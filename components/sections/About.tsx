"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Code2, Cpu, Rocket, Sparkles, TrendingUp } from "lucide-react";

export default function About() {
  const shouldReduce = useReducedMotion();
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28, scale: shouldReduce ? 1 : 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 24, stiffness: 260 } }
  };
  return (
    <section id="about" className="relative w-full overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <BackgroundGradient className="rounded-3xl p-10 bg-background/70 backdrop-blur-xl border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              I build fast, accessible, and thoughtfully crafted web products. I care about clean architecture, smooth DX, and delightful micro-interactions.
            </p>
          </BackgroundGradient>
        </motion.div>

        <BentoGrid className="mb-12">
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <BentoCard
            colSpan={2}
            title="Product-Focused Engineering"
            description="Translating business context into scalable features while keeping UX & performance upfront."
            icon={<Rocket className="w-6 h-6" />}
          >
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>Incremental delivery & measurable impact</li>
              <li>Design systems & reusable primitives</li>
              <li>Perf budgets & accessibility baked-in</li>
            </ul>
          </BentoCard>
          </motion.div>
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <BentoCard
            title="Systems Thinking"
            description="API boundaries, cache layers & deployment pipelines—optimizations compound."
            icon={<Cpu className="w-6 h-6" />}
          >
            <div className="mt-3 flex flex-wrap gap-2">
              {["Next.js", "Edge", "DB Indexing", "Observability"].map(t => (
                <span key={t} className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium tracking-wide text-primary ring-1 ring-primary/30 uppercase">{t}</span>
              ))}
            </div>
          </BentoCard>
          </motion.div>
          <motion.div className="col-span-3" variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <BentoCard
            colSpan={3}
            title="Craft & Interaction"
            description="Subtle motion & state awareness that helps users feel in control."
            icon={<Sparkles className="w-6 h-6" />}
          >
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Motion guidelines: purposeful, performant, and respecting reduced-motion preferences.
            </p>
          </BentoCard>
          </motion.div>
        </BentoGrid>

        <div className="grid gap-6 md:grid-cols-3">
          {[{
            title: "Performance Mindset",
            body: "Ship with metrics: Core Web Vitals, bundle boundaries, streaming strategies.",
            icon: <TrendingUp className="w-5 h-5" />
          }, {
            title: "Type-Safe Everything",
            body: "End-to-end types reduce entire bug classes and speed iteration.",
            icon: <Code2 className="w-5 h-5" />
          }, {
            title: "Delightful Details",
            body: "Micro-transitions & empty-state design elevate perceived quality.",
            icon: <Sparkles className="w-5 h-5" />
          }].map(card => (
            <SpotlightCard key={card.title} className="h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">{card.icon}</div>
                <h3 className="font-semibold tracking-tight">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
