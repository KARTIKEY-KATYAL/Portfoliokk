"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Card } from "../ui/card";
import ContactForm from "../contact-form";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/layout/section";
import { Meteors } from "@/components/ui/meteors";
const Contact = () => {
  const shouldReduce = useReducedMotion();
  const iconVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring', stiffness: 250, damping: 22 } })
  };
  return (
    <Section id="contact">
      <SectionHeader
        title="Let's Connect"
        highlight="Connect"
        description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
        align="center"
        className="mb-10 md:mb-6"
      />
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4 mb-8">
            {[{
              href: "https://github.com/KARTIKEY-KATYAL",
              icon: <Github className="w-5 h-5" />, label: 'GitHub'
            }, {
              href: "https://www.linkedin.com/in/kartikey-katyal-164870239/",
              icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn'
            }, {
              href: "mailto:kartikeykatyal2003@gmail.com",
              icon: <Mail className="w-5 h-5" />, label: 'Email'
            }].map((item, i) => (
              <motion.div key={item.label} custom={i} variants={iconVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  asChild
                  className="relative overflow-hidden hover:shadow-[0_0_0_1px_hsl(var(--primary))]"
                >
                  <a href={item.href} target="_blank" aria-label={item.label}>
                    {item.icon}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
          <Card className="px-5 py-6 sm:px-6 relative overflow-hidden">
            <Meteors number={20} />
            <ContactForm />
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center mt-10 md:mt-20"
        >
          <Image
            src={"/contact.svg"}
            alt="Contact Illustrations"
            width={480}
            height={480}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
            priority={false}
          />
        </motion.div>
  </div>
    </Section>
  );
};

export default Contact;
