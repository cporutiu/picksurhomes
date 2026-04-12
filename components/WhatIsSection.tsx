import FadeUp from "./FadeUp";

export default function WhatIsSection() {
  return (
    <section id="about" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left label column */}
          <FadeUp>
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                The Asset Class
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 select-none">
                01
              </div>
            </div>
          </FadeUp>

          {/* Right content column */}
          <div className="space-y-12">
            <FadeUp delay={0.08}>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                What is a
                <br />
                mortgage note?
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="text-[15px] text-zinc-400 leading-[1.8] max-w-[60ch]">
                A mortgage note is the legal instrument a borrower signs when
                taking out a home loan — it's the promise to repay. When banks
                and credit unions need to clean up their balance sheets, they
                sell these notes, often at a discount to face value.
              </p>
            </FadeUp>

            <FadeUp delay={0.22}>
              <p className="text-[15px] text-zinc-400 leading-[1.8] max-w-[60ch]">
                That's where Picksur Homes enters. We acquire these instruments,
                typically secured by a first-lien position on the underlying
                real property. The discount creates our yield. The real property
                is our floor.
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-zinc-800/70 rounded-xl overflow-hidden">
                {[
                  {
                    term: "Face Value",
                    definition:
                      "The original loan amount owed by the borrower — what we'd collect at full payoff.",
                  },
                  {
                    term: "Purchase Price",
                    definition:
                      "What we pay for the note — typically 60–80 cents on the dollar, creating instant equity.",
                  },
                  {
                    term: "Lien Position",
                    definition:
                      "First lien means we're paid before any junior creditor in the event of default.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.term}
                    className={`p-5 bg-zinc-900/30 ${
                      i !== 2 ? "border-b sm:border-b-0 sm:border-r border-zinc-800/70" : ""
                    }`}
                  >
                    <div className="text-xs text-amber-400 font-medium uppercase tracking-widest mb-2">
                      {item.term}
                    </div>
                    <p className="text-[13px] text-zinc-400 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
