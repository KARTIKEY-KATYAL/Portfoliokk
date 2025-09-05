"use client";
import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Code, Home, Mail, Rocket, SunMoon, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  function goto(hash: string) {
    setOpen(false);
    if (hash.startsWith("#")) {
      // client side anchor scroll
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(hash);
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search navigation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => goto("/")}> <Home className="mr-2 h-4 w-4" /> Home </CommandItem>
          <CommandItem onSelect={() => goto("#skills")}> <Code className="mr-2 h-4 w-4" /> Skills </CommandItem>
          <CommandItem onSelect={() => goto("#projects")}> <Rocket className="mr-2 h-4 w-4" /> Projects </CommandItem>
          <CommandItem onSelect={() => goto("#contact")}> <Mail className="mr-2 h-4 w-4" /> Contact </CommandItem>
          <CommandItem onSelect={() => goto("#hero")}> <User className="mr-2 h-4 w-4" /> Hero </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => setTheme("light")}>🌞 Light</CommandItem>
          <CommandItem onSelect={() => setTheme("dark")}>🌚 Dark</CommandItem>
          <CommandItem onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}> <SunMoon className="mr-2 h-4 w-4" /> Toggle</CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="px-4 py-2 text-xs text-muted-foreground border-t">Press ⌘K / Ctrl K to toggle • Portfolio Command Center</div>
    </CommandDialog>
  );
}
