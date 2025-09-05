"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("#about");

  // Track scroll position for header style & floating nav animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy (manual measurement for consistent highlighting)
  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    let ticking = false;
    const HEADER_OFFSET = 90;

    const calc = () => {
      const scrollPos = window.scrollY + HEADER_OFFSET + window.innerHeight * 0.15; // bias toward upper viewport
      let current = "#about";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollPos) {
          current = `#${id}`;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calc();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const menuItems: { label: string; href: string }[] = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // (floating nav removed earlier) navItems not needed

  const scrollWithOffset = useCallback((hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const HEADER_OFFSET = 80; // height of fixed header
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);
  const handleResumeDownload = () => {
    // Programmatic fetch to ensure download instead of opening in-browser
    fetch("/resume.pdf")
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Kartikey_Katyal_Resume.pdf"; // desired download name
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback: open normally if something fails
        window.open("/resume.pdf", "_blank");
      });
  };

  return (
    <>    
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background/40 backdrop-blur-sm"
        }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(circle_at_center,white,transparent_92%)]">
        <BackgroundBeams />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={"/"} className="text-xl font-bold text-primary">
            Kartikey Katyal
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => {
              const active = activeId === item.href;
              return (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollWithOffset(item.href);
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <Button variant={"default"} size={"sm"} className="gap-2" onClick={handleResumeDownload} aria-label="Download Resume PDF">
              <Download className="w-4 h-4" />
              Resume
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              aria-label="Open command palette"
              className="relative"
              onClick={() => {
                const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                window.dispatchEvent(e);
              }}
            >
              <Command className="w-4 h-4" />
            </Button>
          </nav>

          {/*MOBILE MENU BUTTON  */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {menuItems.map((item) => {
                const active = activeId === item.href;
                return (
                  <a
                    href={item.href}
                    key={item.href}
                    className={`text-sm font-medium transition-all ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollWithOffset(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
              <Button variant={"default"} size={"sm"} className="gap-2" onClick={() => { handleResumeDownload(); setIsMobileMenuOpen(false); }} aria-label="Download Resume PDF">
                <Download className="w-4 h-4" />
                Resume
              </Button>
              <div className="flex gap-2 pt-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open command palette"
                  onClick={() => {
                    const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                    window.dispatchEvent(e);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Command className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Header;
