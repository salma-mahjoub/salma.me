import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Intro } from "@/components/intro";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        manrope.variable,
        playfairDisplay.variable,
        newsreader.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}try{var h=document.documentElement;var l=localStorage.getItem("lang");if(l!=="fr"&&l!=="en"){l="en"}h.dataset.lang=l;h.lang=l;if(l==="fr"){document.title="Salma Mahjoub | Développeuse Mobile & Full-Stack créative"}}catch(e){}try{var h=document.documentElement;if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("intro-seen")}else{h.classList.add("intro-lock")}}catch(e){document.documentElement.classList.add("intro-seen")}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Intro />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
