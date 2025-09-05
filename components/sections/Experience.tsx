"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { Section, SectionHeader, fadeSlide } from "@/components/layout/section";

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
  return (
    <Section id="experience" className="py-16 md:py-20">
      <SectionHeader
        title="Professional Experience"
        highlight="Experience"
        description="A snapshot of roles, impact, and the technologies I use to ship value."
      />
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
                  variants={fadeSlide(i)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative md:col-span-1 ${isRight ? "md:order-2" : "md:order-1"}`}
                  whileHover={{ y: shouldReduce ? 0 : -4 }}
                >
                  <div className={`hidden md:block absolute top-6 h-4 w-4 rounded-full bg-primary/70 ring-4 ring-background/80 backdrop-blur ${isRight ? "-left-[34px]" : "-right-[34px]"}`} />
                  <div className="rounded-2xl p-[2px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                    <Card className="rounded-2xl border-border/10 bg-card/80 backdrop-blur-xl p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-semibold leading-tight">{item.role}</h3>
                        <span className="text-sm font-medium text-primary/80">@ {item.company}</span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {item.period}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                      </div>
                      <ul className="mb-4 space-y-2">
                        {item.achievements.map(a => (
                          <li key={a} className="text-sm leading-relaxed text-muted-foreground">• {a}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map(s => (
                          <span key={s} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-primary ring-1 ring-primary/30 uppercase">{s}</span>
                        ))}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
