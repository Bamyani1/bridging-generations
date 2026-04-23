import { HomeActivities } from "./_components/HomeActivities";
import { HomeCTAFooter } from "./_components/HomeCTAFooter";
import { HomeHero } from "./_components/HomeHero";
import { HomeMissionBand } from "./_components/HomeMissionBand";
import { HomeProgramsGrid } from "./_components/HomeProgramsGrid";
import { HomeSpotlightScroller } from "./_components/HomeSpotlightScroller";
import { HomeStatsTrio } from "./_components/HomeStatsTrio";
import { HomeSuccessPanel } from "./_components/HomeSuccessPanel";
import { HomeTestimonialPanel } from "./_components/HomeTestimonialPanel";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeMissionBand />
      <HomeStatsTrio />
      <HomeProgramsGrid />
      <HomeSuccessPanel />
      <HomeActivities />
      <HomeSpotlightScroller />
      <HomeTestimonialPanel />
      <HomeCTAFooter />
    </>
  );
}
