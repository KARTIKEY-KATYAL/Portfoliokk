"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const current = resolvedTheme || theme; // may be undefined server-side
  const nextTheme = current === "dark" ? "light" : "dark";

  const toggle = () => {
    document.body.classList.add("theme-fade");
    setTimeout(() => document.body.classList.remove("theme-fade"), 450);
    setTheme(nextTheme);
  };

  const aria = mounted ? `Activate ${nextTheme} mode` : "Toggle theme";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={aria}
      onClick={toggle}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false} mode="wait">
        {mounted && (
          <motion.span
            key={current}
            initial={{ y: 6, opacity: 0, rotate: -15, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -6, opacity: 0, rotate: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex items-center justify-center"
          >
            {current === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400 drop-shadow-sm" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
      {!mounted && <Sun className="h-5 w-5 opacity-0" aria-hidden />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
