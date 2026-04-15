import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Yusuf Fauziyan Malik — Fullstack Developer",
  description: "Fullstack Developer specializing in Next.js, Node.js, and modern web technologies. Building elegant, performant digital experiences.",
  keywords: ["fullstack developer", "next.js", "react", "node.js", "typescript", "portfolio"],
  authors: [{ name: "Yusuf Fauziyan Malik" }],
  openGraph: {
    title: "Yusuf Fauziyan Malik — Fullstack Developer",
    description: "Fullstack Developer specializing in Next.js, Node.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
