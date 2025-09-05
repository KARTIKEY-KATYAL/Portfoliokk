"use client";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-card">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_90%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">{siteConfig.name}</h3>
            <p className="text-muted-foreground mb-4">
              Full Stack Developer crafting modern web experiences with a focus on user
              experience and performance.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              {siteConfig.linkedin && (
                <Button variant="outline" size="icon" asChild>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="icon" asChild>
                <a href={`mailto:${siteConfig.email}`} aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">India (Remote / Open to Relocation)</li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}