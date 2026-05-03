"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";

const socials = [
  {
    icon: GithubIcon,
    href: "https://github.com/YusufFauziyan",
    label: "GitHub",
  },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/yusuffauziyan",
    label: "LinkedIn",
  },
  // { icon: XIcon, href: "#", label: "X (Twitter)" },
  {
    icon: Mail,
    href: "mailto:yusuffauziyan@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-xl font-bold">
          <span style={{ color: "var(--fg)" }}>Malik</span>
          <span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Yusuf Fauziyan Malik. All rights
          reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
