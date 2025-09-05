import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail, MapPin, Clock, Phone, CalendarDays, MessageSquare } from "lucide-react";
import { Card } from "../ui/card";
import ContactForm from "../contact-form";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { LampContainer } from "@/components/ui/lamp";
import { Meteors } from "@/components/ui/meteors";

// Central config for contact metadata
const CONTACT_EMAIL = "josh@example.com"; // TODO: replace with real email
const LINKEDIN_URL = "https://linkedin.com"; // TODO: replace with real profile
const CALENDLY_URL = "#"; // Placeholder for scheduling link

interface ContactMethod {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  ariaLabel?: string;
}

// Small motion helpers so the markup stays clean
const fadeInLeft = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
const fadeInRight = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();

  const contactMethods: ContactMethod[] = useMemo(() => ([
    { label: "Response", value: "Within 24h", icon: <Clock className="w-5 h-5" aria-hidden /> },
    { label: "Location", value: "Remote / Open", icon: <MapPin className="w-5 h-5" aria-hidden /> },
    { label: "Preferred", value: "Email first", icon: <Phone className="w-5 h-5" aria-hidden /> },
    { label: "Email", value: CONTACT_EMAIL, icon: <Mail className="w-5 h-5" aria-hidden />, href: `mailto:${CONTACT_EMAIL}`, ariaLabel: "Send email" },
  ]), []);

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
            I&apos;m open to freelance, product engineering roles, and meaningful collaborations. Share a little about your project and I&apos;ll reply within one business day.
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
            transition={{ duration: 0.55, ease: "easeOut" }}
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
              {contactMethods.map(m => (
                <li key={m.label} className="flex items-center gap-3 group">
                  <span className="text-primary group-hover:scale-110 transition-transform">{m.icon}</span>
                  <strong className="min-w-[110px] font-medium text-foreground/90">{m.label}</strong>
                  {m.href ? (
                    <a
                      href={m.href}
                      aria-label={m.ariaLabel || m.label}
                      className="ml-auto underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    >
                      {m.value}
                    </a>
                  ) : (
                    <span className="ml-auto text-foreground/70">{m.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3" aria-label="Social links">
              <Button variant="outline" size="sm" asChild aria-label="Github profile" className="gap-2">
                <a href="https://github.com/KARTIKEY-KATYAL" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" /> Github
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild aria-label="LinkedIn profile" className="gap-2">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild aria-label="Email me" className="gap-2">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail className="w-4 h-4" /> Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild aria-label="Schedule a call" className="gap-2">
                <a href={CALENDLY_URL}>
                  <CalendarDays className="w-4 h-4" /> Schedule
                </a>
              </Button>
            </div>

            <Card className="relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-xl px-6 py-6 focus-within:ring-1 focus-within:ring-primary/40">
              {!prefersReducedMotion && <Meteors number={12} />}

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
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm">Email me directly</a>
              <span className="ml-2">— or connect on LinkedIn.</span>
            </footer>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.55, ease: "easeOut" }}
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
                <p className="text-sm font-medium flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" /> Availability</p>
                <p className="text-xs text-muted-foreground mt-1">Weekdays 9–5 (UTC+5:30) — use schedule link for a slot.</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-border/20 mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Kartikey Katyal — Built with ❤️</div>
      </div>
      <script
        type="application/ld+json"
        // Structured data for a ContactPage
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'Person',
              name: 'Kartikey Katyal',
              email: CONTACT_EMAIL,
              sameAs: ['https://github.com/KARTIKEY-KATYAL', LINKEDIN_URL].filter(Boolean),
            },
            potentialAction: {
              '@type': 'CommunicateAction',
              target: `mailto:${CONTACT_EMAIL}`,
              description: 'Initiate contact via email',
            },
          }),
        }}
      />
    </section>
  );
}
