import { HomeHero } from "@/components/home/Hero";
import { Recognitions } from "@/components/home/Recognitions";
import { MarketSpotlight } from "@/components/home/MarketSpotlight";
import { TotemsPreview } from "@/components/home/TotemsPreview";
import { Timeline } from "@/components/site/Timeline";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";

export default function Home() {
  return (
    <>
      <HomeHero />
      <div className="mt-24 md:mt-32"><Recognitions /></div>
      <MarketSpotlight />
      <TotemsPreview />
      <Timeline />
      <Testimonials />
      <Contact defaultInterest="Ambos" />
    </>
  );
}
