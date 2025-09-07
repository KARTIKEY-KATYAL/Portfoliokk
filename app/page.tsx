import Hero from "@/components/sections/Hero";
import { HomeSectionsClient } from "@/components/home-sections-client";

export default async function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Hero />
      <HomeSectionsClient />
    </main>
  );
}
