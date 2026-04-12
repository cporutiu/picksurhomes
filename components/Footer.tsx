import Link from "next/link";

const links = {
  Company: ["About Us", "Our Team", "Investment Philosophy", "Compliance"],
  Investors: [
    "How It Works",
    "Portfolio Overview",
  ],
  Legal: ["Privacy Policy", "Terms of Use"],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/40 bg-zinc-950 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div className="space-y-4 max-w-[36ch]">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-[3px] bg-amber-400" />
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                Picksur Homes
              </span>
            </div>
            <p className="text-[13px] text-zinc-600 leading-relaxed">
              Mortgage notes buying, selling and brokering for private investors. First-lien positions, active management, monthly distributions.
            </p>
            <div className="text-xs text-zinc-700">
              Chicago, IL · Est. 2018
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <div className="text-[10px] text-zinc-700 uppercase tracking-[0.15em] mb-4">
                  {category}
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-zinc-800/40">
          <p className="text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()} Picksur Homes LLC. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700 max-w-[52ch] sm:text-right">
            Not FDIC insured. Not a deposit. May lose value.
          </p>
        </div>
      </div>
    </footer>
  );
}
