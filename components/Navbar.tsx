"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialMedia } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="mx-4 mt-4 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(var(--bg-raw, 245,242,237), 0.5)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          border: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between px-6 py-3 max-w-6xl mx-auto">
          <motion.a
            href="#"
            className="font-display font-bold text-lg tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span style={{ color: "var(--fg)" }}>{socialMedia.NICKNAME}</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg"
                  style={{
                    color: active
                      ? "var(--fg)"
                      : scrolled
                        ? "var(--fg)"
                        : "var(--muted)",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "var(--card)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
              style={{ background: "var(--accent)", color: "#0D0D0F" }}
            >
              Hire me
            </a>
            <button
              className="md:hidden p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl p-4 md:hidden"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-2 text-sm font-medium border-b transition-colors duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl"
              style={{ background: "var(--accent)", color: "#0D0D0F" }}
            >
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
