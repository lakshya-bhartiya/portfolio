import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getHero } from "@/lib/api";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHero();
  const name = hero?.name || "Lakshya Bhartiya";
  const role = hero?.role || "MERN Stack Developer";
  const tagline = hero?.tagline || "Full Stack MERN Developer building scalable web and mobile applications.";

  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${name} — ${role}`, template: `%s — ${name}` },
    description: tagline,
    keywords: [name, role, "MERN Stack Developer", "React Developer", "Next.js Developer", "Full Stack Developer", "Portfolio"],
    authors: [{ name }],
    openGraph: {
      title: `${name} — ${role}`,
      description: tagline,
      url: siteUrl,
      siteName: `${name} Portfolio`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${name} — ${role}` }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${role}`,
      description: tagline,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.ico" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}>
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
