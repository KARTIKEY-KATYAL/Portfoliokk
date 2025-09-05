import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import CommandPalette from "@/components/ui/command-palette";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero.svg" />
        <meta name="theme-color" content="#000000" />
      </head>
  <body className={`${inter.className} min-h-screen antialiased bg-[radial-gradient(circle_at_20%_20%,hsl(var(--secondary))_0%,transparent_60%),radial-gradient(circle_at_80%_70%,hsl(var(--muted))_0%,transparent_65%)] dark:bg-gradient-to-br dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-foreground transition-colors`}> 
        <ThemeProvider>
          <Header />
          <CommandPalette />
          {children}
          <JsonLd />
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
