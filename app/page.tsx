import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { Why } from "@/components/Why";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { WaitSection } from "@/components/WaitSection";
import { Footer } from "@/components/Footer";
import { SiteFX } from "@/components/SiteFX";

export default function Home() {
  return (
    <>
      <div className="aurora">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
        <div className="blob b4"></div>
      </div>
      <div className="grain"></div>
      <NavBar />
      <main>
        <Hero />
        <ProofSection />
        <Why />
        <Pricing />
        <Faq />
        <WaitSection />
      </main>
      <Footer />
      <SiteFX />
    </>
  );
}
