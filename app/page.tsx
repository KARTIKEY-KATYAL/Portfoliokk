import Hero from "@/components/sections/Hero";
import { HomeSectionsClient } from "@/components/home-sections-client";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default async function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Hero />
      <TracingBeam className="px-6">
        <HomeSectionsClient />
      </TracingBeam>
    </main>
  );
}
