import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Studio } from "@/components/sections/studio";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Builder } from "@/components/sections/builder";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { MHero } from "@/components/mobile/hero";
import { MStudio } from "@/components/mobile/studio";
import { MServices } from "@/components/mobile/services";
import { MProducts } from "@/components/mobile/products";
import { MBuilder } from "@/components/mobile/builder";
import { MApproach } from "@/components/mobile/approach";
import { MContact } from "@/components/mobile/contact";

// Each section has a desktop layout (md and up) and a phone layout (below md).
// The anchor id lives on the wrapper so nav links work on both.
export default function Home() {
  return (
    <>
      <Hero />
      <MHero />
      <Marquee />
      <div id="studio">
        <Studio />
        <MStudio />
      </div>
      <div id="services">
        <Services />
        <MServices />
      </div>
      <div id="products">
        <Products />
        <MProducts />
      </div>
      <div id="build">
        <Builder />
        <MBuilder />
      </div>
      <div id="approach">
        <Approach />
        <MApproach />
      </div>
      <div id="contact">
        <Contact />
        <MContact />
      </div>
    </>
  );
}
