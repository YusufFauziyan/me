"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Mail, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/Icons";

const username = process.env.USERNAME;
const githubAddress = process.env.GITHUB_ADDRESS;
const linkedinAddress = process.env.LINKEDIN_ADDRESS;
const emailAddress = process.env.EMAIL_ADDRESS;
const xAddress = process.env.X_ADDRESS;

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    handle: `@${username}`,
    href: `${githubAddress}`,
    hidden: !githubAddress,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: `in/${username}`,
    href: `${linkedinAddress}`,
    hidden: !linkedinAddress,
  },
  {
    icon: XIcon,
    label: "X / Twitter",
    handle: `@${username}`,
    href: `${xAddress}`,
    hidden: !xAddress,
  },
  {
    icon: Mail,
    label: "Email",
    handle: emailAddress,
    href: `mailto:${emailAddress}`,
    hidden: !emailAddress,
  },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-mono text-sm"
              style={{ color: "var(--accent)" }}
            >
              05.
            </span>
            <h2 className="font-display text-4xl font-bold">Get In Touch</h2>
            <div
              className="flex-1 h-px ml-4"
              style={{ background: "var(--border)" }}
            />
          </div>
          <p className="text-sm mb-16 ml-10" style={{ color: "var(--muted)" }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <AnimatedSection className="lg:col-span-2" delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">
                  Let&apos;s work
                  <br />
                  together.
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  I&apos;m currently open to freelance projects, full-time
                  roles, and interesting collaborations. Reach out — I&apos;ll
                  respond within 24 hours.
                </p>
              </div>
              <div className="space-y-3">
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  <MapPin size={14} style={{ color: "var(--accent)" }} />
                  San Francisco, CA (Remote OK)
                </div>
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  <Clock size={14} style={{ color: "var(--accent)" }} />
                  PST (UTC-8) — Usually responds same day
                </div>
              </div>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, handle, href, hidden }) => {
                  if (hidden) return;

                  return (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 p-3 rounded-2xl group"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <Icon size={14} className="opacity-60" />
                      </div>
                      <div>
                        <div
                          className="text-xs font-mono"
                          style={{ color: "var(--muted)" }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--fg)" }}
                        >
                          {handle}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="lg:col-span-3" delay={0.2}>
            <div
              className="p-8 rounded-3xl h-full"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4 py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={48} style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold">
                    Message sent!
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--fg)",
                    }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      {
                        id: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "John Doe",
                      },
                      {
                        id: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "john@example.com",
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          className="block text-xs font-mono mb-2"
                          style={{ color: "var(--muted)" }}
                        >
                          {field.label}{" "}
                          <span style={{ color: "var(--accent)" }}>*</span>
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.id as "name" | "email"]}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              [field.id]: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-yellow-400 transition-all duration-200"
                          style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            color: "var(--fg)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-mono mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Message <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none focus:ring-2 ring-yellow-400 transition-all duration-200"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        color: "var(--fg)",
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-70"
                    style={{ background: "var(--accent)", color: "#0D0D0F" }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
