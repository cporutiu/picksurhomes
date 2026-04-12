import Image from "next/image";
import FadeUp from "./FadeUp";

const testimonials = [
  {
    quote:
      "We moved $400,000 out of a low-yield bond allocation into Picksur Homes's note fund in early 2022. The 11.8% preferred return has outperformed every fixed-income instrument we've held in the past six years. The monthly distribution cadence is exactly what our income portfolio needed.",
    name: "Marcus Thornfield",
    role: "CFP · Denver, CO",
    avatar: "marcus",
    featured: true,
  },
  {
    quote:
      "What drew me in was the collateral structure. I've been burned by unsecured private lending before. With Picksur Homes, my capital sits behind a first mortgage on a real property — that changes the risk conversation entirely.",
    name: "Renata Koval",
    role: "Houston, TX · Self-Directed IRA Investor",
    avatar: "renata",
    featured: false,
  },
  {
    quote:
      "I've referred three wealth management clients to Picksur Homes. The transparency on deal-level reporting is genuinely institutional. They send a full note tape and BPO before you commit a dollar.",
    name: "Daniel Sørensen",
    role: "Wealth Manager · Nashville, TN",
    avatar: "daniel",
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section
      id="about"
      className="py-32 bg-zinc-900/20 border-t border-zinc-800/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-16">
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                Investor Voices
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 mt-2 select-none">
                04
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                Capital working
                <br />
                in the real world.
              </h2>
            </div>
          </div>
        </FadeUp>

        {/* Testimonial cards — hidden until populated */}
        {/* Uncomment the block below to restore the cards when ready */}
        {/*
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <FadeUp>
            <div className="h-full border border-zinc-800/70 rounded-2xl p-8 lg:p-10 bg-zinc-900/30 flex flex-col justify-between gap-10">
              <p className="text-[17px] text-zinc-300 leading-[1.75] font-medium">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-800/50">
                <Image
                  src={`https://picsum.photos/seed/${testimonials[0].avatar}/80/80`}
                  alt={testimonials[0].name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover grayscale"
                />
                <div>
                  <div className="text-sm font-semibold text-zinc-100">
                    {testimonials[0].name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {testimonials[0].role}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
          <div className="flex flex-col gap-4">
            {testimonials.slice(1).map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1 + 0.05}>
                <div className="h-full border border-zinc-800/70 rounded-2xl p-6 bg-zinc-900/30 flex flex-col justify-between gap-6">
                  <p className="text-[13px] text-zinc-400 leading-[1.75]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
                    <Image
                      src={`https://picsum.photos/seed/${t.avatar}/80/80`}
                      alt={t.name}
                      width={34}
                      height={34}
                      className="rounded-full object-cover grayscale"
                    />
                    <div>
                      <div className="text-xs font-semibold text-zinc-200">
                        {t.name}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
