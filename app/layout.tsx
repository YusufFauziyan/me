import type { Metadata, Viewport } from "next";
import "./globals.css";
import Smoother from "@/components/Smoother";
import HeroCanvas from "@/components/HeroCanvas";
import { site, projects } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Fullstack Developer with 4+ years building high-performance web and mobile products. React, Next.js, Node.js, Flutter. Available for remote work.",
  keywords: [
    "Yusuf Fauziyan Malik",
    "fullstack developer",
    "software engineer Indonesia",
    "Next.js developer",
    "React developer",
    "Node.js",
    "Flutter developer",
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.headline}`,
    description:
      "Fullstack Developer building fast, scalable web and mobile products. React, Next.js, Node.js, Flutter.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.headline}`,
    description:
      "Fullstack Developer building fast, scalable web and mobile products. React, Next.js, Node.js, Flutter.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Person + ItemList so search results can show the role, the socials and the projects.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  image: `${site.url}/opengraph-image`,
  description:
    "Fullstack Developer with 4+ years building high-performance web and mobile products.",
  address: { "@type": "PostalAddress", addressCountry: "ID", addressLocality: "Jakarta" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Node.js", "Express",
    "PostgreSQL", "Prisma", "Flutter", "Python",
  ],
  worksFor: { "@type": "Organization", name: "PT Bodha Padma Nawadhya" },
  makesOffer: projects.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "SoftwareApplication", name: p.title, description: p.description, url: p.href },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Outside #smooth-content on purpose: ScrollSmoother transforms that
            subtree, which would break a position:fixed canvas. */}
        <HeroCanvas />
        <Smoother>{children}</Smoother>
      </body>
    </html>
  );
}
