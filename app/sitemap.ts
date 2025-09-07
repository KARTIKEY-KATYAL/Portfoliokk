import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  const sectionAnchors = ["#skills", "#projects", "#contact", "#experience"]; // ensure these match actual ids
  const staticPages = ["/"];
  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map(p => ({
      url: `${base}${p === '/' ? '' : p}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0
    })),
    ...sectionAnchors.map(anchor => ({
      url: `${base}/${anchor.replace('#','')}`.replace(/\/$/, ""),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }))
  ];
  return entries;
}
