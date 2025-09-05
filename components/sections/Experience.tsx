"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card } from "@/components/ui/card";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  stack: string[];
}

const data: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Open Source",
    period: "2023 - Present",
    location: "Remote",
    achievements: [
      "Built and maintained multiple full-stack applications using Next.js & Node.js",
      "Optimized performance & accessibility scores to 90+ Lighthouse",
      "Contributed to open-source UI libraries & tooling"
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "AWS"]
  },
  {
    role: "Frontend Engineer (Intern)",
    company: "Startup Labs",
    period: "2022 - 2023",
    location: "Hybrid",
    achievements: [
      "Implemented design system components reducing UI build time by 30%",
      "Integrated analytics & tracking improving funnel insights",
      "Collaborated with backend to refine API contracts"
    ],
    stack: ["React", "Redux", "Tailwind", "Framer Motion"]
  }
];

export default function Experience() {
  const shouldReduce = useReducedMotion();
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, type: 'spring', stiffness: 260, damping: 30 }
    })
  };
  return (
    <section id="experience" className="relative w-full overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "3.5rem", maxWidth: "48rem", textAlign: "center" }}
        >
          <BackgroundGradient className="rounded-3xl p-10 bg-background/70 backdrop-blur-xl border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional <span className="text-primary">Experience</span></h2>
            <p className="text-muted-foreground">A snapshot of roles, impact, and the technologies I use to ship value.</p>
          </BackgroundGradient>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2" />
          <ul className="space-y-16 md:space-y-24">
            {data.map((item: ExperienceItem, i) => {
              const isRight = i % 2 === 0;
              return (
                <li key={item.company} className="relative md:grid md:grid-cols-2 md:gap-10">
                  <div className={`md:col-span-1 ${isRight ? "md:order-1" : "md:order-2"}`}></div>
                  <motion.div
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className={`relative md:col-span-1 ${isRight ? "md:order-2" : "md:order-1"}`}
                    whileHover={{ y: shouldReduce ? 0 : -4 }}
                  >
                    <div className={`hidden md:block absolute top-6 w-4 h-4 rounded-full bg-primary/70 ring-4 ring-background/80 backdrop-blur ${isRight ? "-left-[34px]" : "-right-[34px]"}`} />
                    <BackgroundGradient className="rounded-2xl p-[2px]">
                      <Card className="rounded-2xl border-border/10 bg-card/80 backdrop-blur-xl p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-lg leading-tight">{item.role}</h3>
                          <span className="text-sm text-primary/80 font-medium">@ {item.company}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                          <span className="inline-flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {item.period}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                        </div>
                        <ul className="mb-4 space-y-2">
                          {item.achievements.map(a => (
                            <li key={a} className="text-sm text-muted-foreground leading-relaxed">• {a}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {item.stack.map(s => (
                            <span key={s} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary ring-1 ring-primary/30 tracking-wide uppercase">{s}</span>
                          ))}
                        </div>
                      </Card>
                    </BackgroundGradient>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
