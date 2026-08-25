"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#languages", label: "Languages" },
  { href: "#features", label: "Features" },
  { href: "#method", label: "How It Works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${
              scrolled
                ? "glass shadow-lg shadow-navy/5"
                : "bg-white/60 backdrop-blur-sm"
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-white font-bold text-base font-[family-name:var(--font-display)]">
                  L
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-navy font-bold text-xl hidden sm:block">
                LUNO
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-text-light hover:text-navy hover:bg-navy/5 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-5 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5 rounded-full transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-full hover:bg-navy/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-navy" />
              ) : (
                <Menu className="w-5 h-5 text-navy" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 p-4 md:hidden"
          >
            <div className="glass rounded-3xl p-6 shadow-xl shadow-navy/10">
              <nav className="flex flex-col gap-1 mb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-navy hover:bg-navy/5 rounded-2xl transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-navy text-center hover:bg-navy/5 rounded-2xl transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-base justify-center"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
