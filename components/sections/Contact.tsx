import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Card } from "../ui/card";
import ContactForm from "../contact-form";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
const Contact = () => {
  const shouldReduce = useReducedMotion();
  const iconVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring', stiffness: 250, damping: 22 } })
  };
  return (
    <section id="contact" className="relative w-full overflow-hidden">
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
          <h2 className="text-3xl font-bold mb-6">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="flex gap-4 mb-8">
            {[{
              href: "https://github.com/KARTIKEY-KATYAL",
              icon: <Github className="w-5 h-5" />, label: 'GitHub'
            }, {
              href: "#",
              icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn'
            }, {
              href: "mailto:josh@example.com",
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
          <Card className="px-6 py-6 relative overflow-hidden">
            <Meteors number={20} />
            <ContactForm />
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center mt-20"
        >
          <Image
            src={"/contact.svg"}
            alt="Contact Illustrations"
            width={600}
            height={600}
          />
        </motion.div>
  </div>
      </div>
    </section>
  );
};

export default Contact;
