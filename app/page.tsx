import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhatIsSection from "@/components/WhatIsSection";
import WhyInvest from "@/components/WhyInvest";
import HowItWorks from "@/components/HowItWorks";
// import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTALazy";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": "https://quicknotedeals.com/#organization",
      name: "Picksur Homes",
      alternateName: "QuickNoteDeals",
      legalName: "Picksur Homes LLC",
      url: "https://quicknotedeals.com",
      description:
        "Picksur Homes buys, sells, and brokers performing and sub-performing mortgage notes, connecting private investors to first-lien, collateral-backed yield.",
      foundingDate: "2018",
      email: "info@quicknotedeals.com",
      telephone: "+1-201-361-6055",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Clifton",
        addressRegion: "NJ",
        postalCode: "07013",
        addressCountry: "US",
      },
      areaServed: "US",
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mortgage Note Buying & Brokering",
            description:
              "Acquisition, brokering, and sale of first-lien mortgage notes for banks, credit unions, hedge funds, and private note holders.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mortgage Note Investment",
            description:
              "First-lien-secured, collateral-backed mortgage note investment opportunities with monthly distributions for private investors.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <WhatIsSection />
        <WhyInvest />
        <HowItWorks />
        {/* <Portfolio /> */}
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
