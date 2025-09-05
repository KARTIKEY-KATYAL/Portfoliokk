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
const Contact = () => {
  return (
  <section id="contact" className="relative w-full overflow-hidden scroll-mt-24">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Let&apos;s Connect
        </motion.h1>
      </LampContainer>
      
      <div className="relative bg-background py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_88%)]">
          <BackgroundBeams />
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            I&apos;m open to freelance, product engineering roles, and meaningful collaborations. Drop a message—average response within 24 hours.
          </p>
          <ul className="mb-8 grid gap-3 text-sm text-muted-foreground" aria-label="Contact quick info">
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Response within 24h</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Remote / Open to relocate</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Prefer email first contact</li>
          </ul>
          <div className="flex gap-3 mb-8" aria-label="Social links">
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
              <a href="mailto:josh@example.com" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <Card className="px-6 py-6 relative overflow-hidden border-border/40 bg-card/70 backdrop-blur-xl">
            <Meteors number={20} />
            <ContactForm />
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mt-20"
        >
          <Image
            src={"/contact.svg"}
            alt="Contact Illustrations"
            width={600}
            height={600}
            loading="lazy"
            className="drop-shadow-xl"
          />
        </motion.div>
  </div>
      </div>
    </section>
  );
};

export default Contact;
