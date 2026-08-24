import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProofSection } from "@/components/ProofSection";
import { Differentiators } from "@/components/Differentiators";
import { BuilderCodeSection } from "@/components/BuilderCodeSection";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <ProofSection />
      <Differentiators />
      <BuilderCodeSection />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
