import FadeUp from "./FadeUp";
import { Lock, ChartLineUp, Shuffle, Headset } from "@phosphor-icons/react/dist/ssr";

const reasons = [
  {
    number: "01",
    icon: Lock,
    title: "First-Lien Security",
    body: "Every note in our portfolio holds a first-lien position on the underlying real property. In the event of borrower default, our position is protected before unsecured creditors and junior lienholders — with the physical asset as our backstop.",
  },
  {
    number: "02",
    icon: ChartLineUp,
    title: "Double-Digit Yields",
    body: "Our current portfolio averages 11.3% annualized returns with monthly distributions to investors. The discount we acquire notes at creates built-in yield from day one — independent of interest rate fluctuations.",
  },
  {
    number: "03",
    icon: Shuffle,
    title: "Non-Correlated Returns",
    body: "Mortgage note performance is tied to real property values and borrower behavior, not equity markets. Our returns don't swing with the S&P 500, making notes a genuine diversification tool for your capital.",
  },
  {
    number: "04",
    icon: Headset,
    title: "Active Management",
    body: "Our Chicago-based team handles all note servicing, borrower communications, loss mitigation, and legal proceedings. You receive distributions — we manage the complexity.",
  },
];

export default function WhyInvest() {
  return (
    <section id="investors" className="py-32 bg-zinc-950 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-20">
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                Why Invest
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 mt-2 select-none">
                02
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                The structural
                <br />
                case for notes.
              </h2>
            </div>
          </div>
        </FadeUp>

        {/* Feature list */}
        <div className="divide-y divide-zinc-800/50">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <FadeUp key={reason.number} delay={i * 0.07}>
                <div className="py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_2fr] gap-6 md:gap-12 items-start group">
                  {/* Number + Icon */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 w-full md:w-20">
                    <span className="font-mono text-xs text-zinc-700">
                      {reason.number}
                    </span>
                    <div className="p-2 border border-zinc-800 rounded-lg bg-zinc-900/60 group-hover:border-amber-400/30 transition-colors duration-300">
                      <Icon
                        size={18}
                        weight="regular"
                        className="text-zinc-500 group-hover:text-amber-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-zinc-100 tracking-tight pt-0.5">
                    {reason.title}
                  </h3>

                  {/* Body */}
                  <p className="text-[14px] text-zinc-400 leading-[1.8] max-w-[58ch]">
                    {reason.body}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
