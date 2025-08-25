import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Card } from "../ui/card";
import ContactForm from "../contact-form";
import Image from "next/image";
import { Boxes } from "@/components/ui/background-boxes"; // retained
import { BackgroundBeams } from "@/components/ui/background-beams";
import { LampContainer } from "@/components/ui/lamp";
import { Meteors } from "@/components/ui/meteors";
const Contact = () => {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
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
          Let's Connect
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
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="flex gap-4 mb-8">
            <Button variant={"outline"} size={"icon"} asChild>
              <a href="https://github.com/KARTIKEY-KATYAL" target="_blank">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <a href="#" target="_blank">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <a href="mailto:josh@example.com" target="_blank">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <Card className="px-6 py-6 relative overflow-hidden">
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
          />
        </motion.div>
  </div>
      </div>
    </section>
  );
};

export default Contact;
