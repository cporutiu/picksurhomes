"use client";

import { motion } from "framer-motion";
import { MouseEvent } from "react";
import FadeUp from "./FadeUp";

const notes = [
  {
    id: "austin-tx",
    location: "Austin, TX",
    lienType: "First Lien",
    faceValue: "$347,500",
    yield: "11.8%",
    ltv: "63%",
    status: "Performing",
    statusColor: "emerald",
    property: "Single-Family Residential",
    acquired: "Mar 2024",
  },
  {
    id: "denver-co",
    location: "Denver, CO",
    lienType: "First Lien",
    faceValue: "$218,000",
    yield: "10.4%",
    ltv: "71%",
    status: "Performing",
    statusColor: "emerald",
    property: "Single-Family Residential",
    acquired: "Jan 2024",
  },
  {
    id: "tampa-fl",
    location: "Tampa, FL",
    lienType: "Second Lien",
    faceValue: "$89,750",
    yield: "14.2%",
    ltv: "58%",
    status: "Watch List",
    statusColor: "amber",
    property: "Condominium",
    acquired: "Nov 2023",
  },
  {
    id: "phoenix-az",
    location: "Phoenix, AZ",
    lienType: "First Lien",
    faceValue: "$412,000",
    yield: "9.7%",
    ltv: "68%",
    status: "Performing",
    statusColor: "emerald",
    property: "Multi-Family (2 units)",
    acquired: "Jun 2024",
  },
  {
    id: "nashville-tn",
    location: "Nashville, TN",
    lienType: "First Lien",
    faceValue: "$263,500",
    yield: "12.1%",
    ltv: "65%",
    status: "Performing",
    statusColor: "emerald",
    property: "Single-Family Residential",
    acquired: "Apr 2024",
  },
];

const statusStyles: Record<string, string> = {
  emerald:
    "text-emerald-400 bg-emerald-400/8 border-emerald-400/25",
  amber: "text-amber-400 bg-amber-400/8 border-amber-400/25",
};

const statusDotStyles: Record<string, string> = {
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
};

function NoteCard({
  note,
  featured = false,
}: {
  note: (typeof notes)[0];
  featured?: boolean;
}) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  return (
    <div
      className="spotlight-card border border-zinc-800/70 rounded-xl bg-zinc-900/30 hover:border-zinc-700/70 transition-all duration-300 cursor-default overflow-hidden h-full"
      onMouseMove={handleMouseMove}
    >
      <div
        className={`relative z-10 flex flex-col h-full ${
          featured ? "p-7" : "p-5"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-[0.12em] mb-1">
              {note.property}
            </div>
            <div
              className={`font-display font-semibold text-zinc-100 tracking-tight ${
                featured ? "text-xl" : "text-base"
              }`}
            >
              {note.location}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">{note.lienType}</div>
          </div>
          <div
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium border rounded-full ${
              statusStyles[note.statusColor]
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full ${statusDotStyles[note.statusColor]}`}
            />
            {note.status}
          </div>
        </div>

        {/* Metrics */}
        <div
          className={`grid gap-3 pt-5 border-t border-zinc-800/50 mt-auto ${
            featured ? "grid-cols-3" : "grid-cols-3"
          }`}
        >
          {[
            { label: "Face Value", value: note.faceValue },
            { label: "Yield", value: note.yield },
            { label: "LTV", value: note.ltv },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="font-mono text-sm font-semibold text-zinc-100">
                {metric.value}
              </div>
              <div className="text-[10px] text-zinc-600 mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Acquired tag */}
        <div className="mt-4 text-[10px] text-zinc-700">
          Acquired {note.acquired}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-zinc-950 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-14">
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                Active Portfolio
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 mt-2 select-none">
                04
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                Current note
                <br />
                positions.
              </h2>
              <div className="hidden md:block text-xs text-zinc-600 max-w-[26ch] text-right leading-relaxed pb-1">
                A representative sample.
                <br />
                Full disclosure provided to accredited investors.
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Row 1: Featured + 1 */}
            <div className="md:col-span-2">
              <NoteCard note={notes[0]} featured />
            </div>
            <div>
              <NoteCard note={notes[1]} />
            </div>

            {/* Row 2: 3 equal */}
            <div>
              <NoteCard note={notes[2]} />
            </div>
            <div>
              <NoteCard note={notes[3]} />
            </div>
            <div>
              <NoteCard note={notes[4]} />
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <FadeUp delay={0.15}>
          <p className="mt-6 text-xs text-zinc-700 leading-relaxed max-w-[70ch]">
            All figures are approximate. Investment in mortgage notes involves
            risk including potential loss of principal. Past performance does not
            guarantee future results. For accredited investors only under Reg D.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
