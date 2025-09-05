"use client";
import React from "react";
import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage.startsWith("http")
      ? siteConfig.ogImage
      : siteConfig.url + siteConfig.ogImage,
    jobTitle: "Full-Stack Developer",
    sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean),
    email: `mailto:${siteConfig.email}`,
    description: siteConfig.description,
  };
  return (
    <script
      type="application/ld+json"
      // Using JSON.stringify to ensure proper escaping
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
