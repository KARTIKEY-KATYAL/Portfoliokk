"use client";
import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/constants";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <BackgroundGradient className="rounded-3xl p-10 bg-background/70 backdrop-blur-xl border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People <span className="text-primary">Say</span></h2>
            <p className="text-muted-foreground">Feedback from collaborators &amp; stakeholders I&apos;ve built products with.</p>
          </BackgroundGradient>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <BackgroundGradient className="rounded-2xl p-[2px] h-full">
                <Card className="relative h-full flex flex-col gap-4 rounded-2xl border-border/10 bg-card/80 backdrop-blur-xl p-6">
                  <div className="flex items-center gap-4">
                    <Image src={t.image} alt={t.name} width={56} height={56} className="rounded-full ring-2 ring-primary/30" />
                    <div>
                      <p className="font-semibold leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.content}</p>
                </Card>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
