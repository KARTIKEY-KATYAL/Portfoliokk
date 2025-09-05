"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">{error.message || "An unexpected error occurred."}</p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Retry</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>Go Home</Button>
      </div>
    </main>
  );
}
