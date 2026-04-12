"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/92 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-4 h-4 rounded-[3px] bg-amber-400 group-hover:bg-amber-300 transition-colors duration-200" />
          <span className="font-semibold text-sm tracking-tight text-zinc-100">
            Picksur Homes
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Investors", href: "#investors" },
            { label: "About", href: "#about" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-amber-400 text-zinc-950 rounded-md hover:bg-amber-300 transition-all duration-200 active:scale-[0.97]"
        >
          Get in Touch
        </Link>
      </div>
    </header>
  );
}
