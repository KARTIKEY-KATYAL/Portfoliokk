import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    "", "#about", "#skills", "#projects", "#contact",
  ]
    .map((p) => p.replace(/^#/, ""))
    .filter(Boolean)
    .map((path) => ({
      url: `${base}/${path}`.replace(/\/$/, ""),
      lastModified: now,
      changeFrequency: "weekly",
      priority: path ? 0.6 : 1.0,
    }));
}
