import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground max-w-md">The page you are looking for could not be found.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
