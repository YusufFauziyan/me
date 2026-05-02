"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, BookOpen, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
  githubUrl: string;
  demoUrl?: string;
}

const getReadmeUrl = (url: string) => {
  if (url.includes("/blob/")) {
    return url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
  }
  return (
    url.replace("github.com", "raw.githubusercontent.com") + "/main/README.md"
  );
};

const getRepoName = (url: string) => {
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1] || "Repository";
};

/**
 * Strip HTML comments <!-- ... --> from markdown content.
 * ReactMarkdown renders them as raw text nodes, so we remove them in pre-processing.
 */
const stripHtmlComments = (markdown: string): string =>
  markdown.replace(/<!--[\s\S]*?-->/g, "");

/**
 * Get the raw GitHub base URL for a repo, used to resolve relative image paths.
 * e.g. https://github.com/user/repo  →  https://raw.githubusercontent.com/user/repo/main
 */
const getRawBaseUrl = (githubUrl: string): string => {
  const clean = githubUrl.replace(/\/$/, "");
  // If it's a blob URL, derive the base branch path
  if (clean.includes("/blob/")) {
    // e.g. .../blob/main/README.md → .../main
    const parts = clean
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
    return parts.substring(0, parts.lastIndexOf("/"));
  }
  return clean.replace("github.com", "raw.githubusercontent.com") + "/main";
};

/**
 * Resolve a potentially-relative image src to an absolute URL.
 * Absolute URLs (http/https) and shields.io badges are returned as-is.
 */
const resolveImageSrc = (src: string, rawBase: string): string => {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  // Remove leading ./
  const normalized = src.replace(/^\.\//, "");
  return `${rawBase}/${normalized}`;
};

export default function ReadmeModal({
  isOpen,
  onClose,
  githubUrl,
  demoUrl,
}: ReadmeModalProps) {
  const [content, setContent] = useState<string>("");
  const [rawBase, setRawBase] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !githubUrl) return;

    const fetchReadme = async () => {
      setLoading(true);
      setError(null);
      setContent("");
      setRawBase(getRawBaseUrl(githubUrl));

      try {
        const rawUrl = getReadmeUrl(githubUrl);
        const res = await fetch(rawUrl);

        if (!res.ok) {
          if (rawUrl.includes("/main/")) {
            const fallbackUrl = rawUrl.replace("/main/", "/master/");
            setRawBase(getRawBaseUrl(githubUrl).replace("/main", "/master"));
            const fallbackRes = await fetch(fallbackUrl);
            if (!fallbackRes.ok) throw new Error("README not found");
            setContent(stripHtmlComments(await fallbackRes.text()));
          } else {
            throw new Error("README not found");
          }
        } else {
          setContent(stripHtmlComments(await res.text()));
        }
      } catch (err) {
        setError("Could not load README.md for this project.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [isOpen, githubUrl]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl max-h-[90dvh]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <BookOpen
                  size={15}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium leading-none mb-0.5">
                  README
                </p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate leading-none">
                  {getRepoName(githubUrl)}
                </p>
              </div>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:opacity-60 duration-150 transition-colors bg-accent"
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">Demo</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8 md:py-7">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2
                    size={20}
                    className="animate-spin text-zinc-300 dark:text-zinc-600"
                  />
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">
                    Loading README.md...
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 gap-2">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {error}
                  </p>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View on GitHub →
                  </a>
                </div>
              ) : (
                <article
                  className="prose prose-zinc dark:prose-invert prose-sm max-w-none
                  prose-headings:font-semibold prose-headings:tracking-tight
                  prose-h1:text-xl prose-h1:mb-4 prose-h1:mt-0
                  prose-h2:text-base prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800
                  prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2
                  prose-p:text-sm prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                  prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                  prose-code:text-xs prose-code:font-mono prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-zinc-700 dark:prose-code:text-zinc-300 prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-zinc-950 dark:prose-pre:bg-zinc-950 prose-pre:rounded-xl prose-pre:text-xs prose-pre:leading-relaxed
                  prose-pre:border prose-pre:border-zinc-800
                  prose-blockquote:border-l-2 prose-blockquote:border-zinc-200 dark:prose-blockquote:border-zinc-700 prose-blockquote:not-italic prose-blockquote:text-zinc-500
                  prose-li:text-sm prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-li:leading-relaxed
                  prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200 prose-strong:font-semibold
                  prose-table:text-xs prose-th:bg-zinc-50 dark:prose-th:bg-zinc-800/60 prose-th:font-medium
                  prose-hr:border-zinc-100 dark:prose-hr:border-zinc-800
                  prose-img:rounded-xl prose-img:my-4
                "
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      img({ src, alt }) {
                        const resolved = resolveImageSrc(
                          typeof src === "string" ? src : "",
                          rawBase,
                        );
                        return (
                          <img
                            src={resolved}
                            alt={alt ?? ""}
                            className="rounded-xl my-4 max-w-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        );
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              )}
            </div>

            {/* Footer */}
            {!loading && !error && content && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
                <p className="text-xs text-zinc-400 dark:text-zinc-600">
                  README.md
                </p>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  View full repository
                  <ExternalLink size={11} />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
