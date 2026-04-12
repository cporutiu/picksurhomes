"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stats = [
  { label: "Annualized Return", value: "11.3%" },
  { label: "Active Notes", value: "47" },
  { label: "States Covered", value: "14" },
  { label: "Avg LTV", value: "64.2%" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-zinc-950 pt-16 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-400/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-400/90 uppercase tracking-[0.15em] border border-amber-400/15 rounded-full px-3 py-1.5 bg-amber-400/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
                Established 2018 | New Jersey
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl xl:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1.03] text-zinc-50"
            >
              Private debt.
              <br />
              <span className="text-zinc-600">Collateral-backed</span>
              <br />
              yields.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[15px] text-zinc-400 leading-[1.75] max-w-[54ch]"
            >
              Picksur Homes buys performing and sub-performing mortgage
              notes, sells performing notes to investors seeking stable yield,
              and brokers notes that fall outside our buy-box to a vetted
              network of buyers — connecting capital to the right deal at every
              stage of the note lifecycle.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-zinc-950 text-sm font-semibold rounded-md hover:bg-amber-300 transition-all duration-200 active:scale-[0.97]"
              >
                Ask for more Info
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 border border-zinc-800 rounded-md hover:border-zinc-600 hover:text-zinc-200 transition-all duration-200"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-zinc-800/80 rounded-xl overflow-hidden">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-5 py-4 bg-zinc-900/40 ${
                      i !== stats.length - 1
                        ? "border-r border-zinc-800/80"
                        : ""
                    }`}
                  >
                    <div className="font-mono text-xl font-semibold text-zinc-100 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/hero-home.jpg"
                alt="Real property collateral securing mortgage notes"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-transparent" />

              {/* Location tag */}
              <div className="absolute top-5 left-5">
                <div className="inline-flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-xs text-zinc-300">
                  <MapPin size={11} weight="fill" className="text-amber-400" />
                  Bloomfield, NJ
                </div>
              </div>

              {/* Floating deal card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase tracking-[0.12em]">
                        Illustrative Example
                      </div>
                      <div className="text-sm font-semibold text-zinc-100 mt-0.5">
                        Bloomfield, NJ · First Lien
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/8 border border-emerald-400/20 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Performing
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/60">
                    {[
                      { label: "Face Value", value: "$347,500" },
                      { label: "Current Yield", value: "10%" },
                      { label: "LTV", value: "63%" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="font-mono text-sm font-semibold text-zinc-100">
                          {item.value}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
