import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhatIsSection from "@/components/WhatIsSection";
import WhyInvest from "@/components/WhyInvest";
import HowItWorks from "@/components/HowItWorks";
// import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
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
