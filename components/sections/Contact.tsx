import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail, MapPin, Clock, Phone } from "lucide-react";
import { Card } from "../ui/card";
import ContactForm from "../contact-form";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { LampContainer } from "@/components/ui/lamp";
import { Meteors } from "@/components/ui/meteors";

// Small motion helpers so the markup stays clean
const fadeInLeft = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
const fadeInRight = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };

export default function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden scroll-mt-24">
      <LampContainer>
        <motion.header
          initial={{ opacity: 0.5, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
          className="mt-8 text-center"
          aria-labelledby="contact-heading"
        >
          <h1
            id="contact-heading"
            className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl"
          >
            Let&apos;s Connect
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base max-w-2xl mx-auto">
            I&apos;m open to freelance, product engineering roles, and meaningful collaborations. Share a little
            about your project and I&apos;ll get back within one business day.
          </p>
        </motion.header>
      </LampContainer>

      <div className="relative bg-background py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_88%)]">
          <BackgroundBeams />
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold">
                Say <span className="text-primary">Hello</span>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Whether it&apos;s a short contract, a long-term role, or a quick question — I&apos;m happy to
                chat. If you prefer, find quick ways to reach me below.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground" aria-label="Contact quick info">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" aria-hidden />
                <strong className="min-w-[110px]">Response</strong>
                <span className="ml-auto">Usually within 24 hours</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" aria-hidden />
                <strong className="min-w-[110px]">Location</strong>
                <span className="ml-auto">Remote — open to relocate</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" aria-hidden />
                <strong className="min-w-[110px]">Preferred</strong>
                <span className="ml-auto">Email first</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" aria-hidden />
                <strong className="min-w-[110px]">Email</strong>
                <a
                  href="mailto:josh@example.com"
                  className="ml-auto underline-offset-2 hover:underline"
                  aria-label="Send email to Josh"
                >
                  josh@example.com
                </a>
              </li>
            </ul>

            <div className="flex gap-3" aria-label="Social links">
              <Button variant="outline" size="icon" asChild aria-label="Github profile">
                <a href="https://github.com/KARTIKEY-KATYAL" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild aria-label="LinkedIn profile">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild aria-label="Send email">
                <a href="mailto:josh@example.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>

            <Card className="relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-xl px-6 py-6">
              <Meteors number={12} />

              {/* Provide a small header for screen readers / clarity */}
              <header className="mb-4">
                <h3 className="text-lg font-medium">Message me</h3>
                <p className="text-xs text-muted-foreground">Tell me about your project — short & sweet works great.</p>
              </header>

              {/* Keep the ContactForm component as the canonical form. We rely on it for validation & submission logic. */}
              <ContactForm />
            </Card>

            <footer className="mt-4 text-xs text-muted-foreground">
              <span>Prefer not to use forms? </span>
              <a href="mailto:josh@example.com" className="underline hover:text-primary">Email me directly</a>
              <span className="ml-2">— or connect on LinkedIn.</span>
            </footer>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
            aria-hidden
          >
            <div className="max-w-md w-full">
              <Image
                src="/contact.svg"
                alt="Contact Illustration"
                width={700}
                height={700}
                loading="eager"
                className="mx-auto drop-shadow-2xl rounded-lg"
                priority
              />

              <Card className="mt-6 p-4 text-center bg-card/50 backdrop-blur-sm">
                <p className="text-sm font-medium">Quick availability</p>
                <p className="text-xs text-muted-foreground mt-1">Open for meetings on weekdays — schedule after initial email.</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-border/20 mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Josh — Built with ❤️</div>
      </div>
    </section>
  );
}
