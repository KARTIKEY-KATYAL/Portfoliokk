"use client";
import React from "react";
import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const person = {
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

  const webSite = {
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.title,
    inLanguage: siteConfig.locale?.replace('_', '-') || 'en-US',
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: siteConfig.url + "/#projects" },
      { "@type": "ListItem", position: 3, name: "Contact", item: siteConfig.url + "/#contact" }
    ]
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, webSite, breadcrumb]
  };
  return (
    <script
      type="application/ld+json"
      // Using JSON.stringify to ensure proper escaping
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
