import FadeUp from "./FadeUp";

const steps = [
  {
    step: "01",
    title: "Source",
    body: "We acquire notes directly from banks, credit unions, hedge funds, and private sellers at a discount to face value.",
  },
  {
    step: "02",
    title: "Underwrite",
    body: "Every note is evaluated: borrower payment history, property value via BPO, lien position, local market conditions, and legal standing.",
  },
  {
    step: "03",
    title: "Structure",
    body: "Investors participate through a promissory note or LLC interest, secured by the underlying real estate asset. Terms defined up front.",
  },
  {
    step: "04",
    title: "Distribute",
    body: "Borrower payments flow through our licensed servicer. Monthly distributions are sent directly to investor accounts.",
  },
  {
    step: "05",
    title: "Exit",
    body: "Notes mature, are sold on the secondary market, or resolved through our legal framework — with capital and gains returned to investors.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32 bg-zinc-900/25 border-t border-zinc-800/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-20">
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                The Process
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 mt-2 select-none">
                03
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                From acquisition
                <br />
                to distribution.
              </h2>
            </div>
          </div>
        </FadeUp>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-zinc-800/60 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.08}>
              <div
                className={`p-6 lg:p-8 h-full flex flex-col gap-8 bg-zinc-900/20 hover:bg-zinc-900/50 transition-colors duration-300 ${
                  i !== steps.length - 1
                    ? "border-b md:border-b-0 md:border-r border-zinc-800/60"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-zinc-700">
                    {step.step}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden md:block text-zinc-800 text-lg leading-none">
                      →
                    </span>
                  )}
                </div>

                <div className="mt-auto space-y-2">
                  <div className="font-display text-lg font-semibold text-zinc-100 tracking-tight">
                    {step.title}
                  </div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
