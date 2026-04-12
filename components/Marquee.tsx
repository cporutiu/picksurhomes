"use client";

const items = [
  { label: "Portfolio YTD Return", value: "11.3%" },
  { label: "Active Notes", value: "47" },
  { label: "States Covered", value: "14" },
  { label: "First-Lien Position", value: "89%" },
  { label: "Avg Note Size", value: "$247K" },
  { label: "Avg LTV", value: "64.2%" },
  { label: "Min Investment", value: "None" },
];

function MarqueeItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-3 mx-8 flex-shrink-0">
      <span className="text-xs text-zinc-600 uppercase tracking-widest">
        {label}
      </span>
      <span className="font-mono text-sm font-semibold text-amber-400">
        {value}
      </span>
      <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
    </span>
  );
}

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-zinc-800/60 bg-zinc-900/30 overflow-hidden py-4">
      <div className="flex animate-marquee">
        {doubled.map((item, i) => (
          <MarqueeItem key={i} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
