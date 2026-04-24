import { Reveal } from "@/components/ui/Reveal";

type AboutMissionVisionProps = {
  missionFull: string;
  visionFull: string;
};

export function AboutMissionVision({ missionFull, visionFull }: AboutMissionVisionProps) {
  return (
    <section
      id="mission"
      aria-labelledby="about-mission-title"
      className="scroll-mt-20 bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-5">
            <h2 id="about-mission-title" className="text-balance text-heading-1 text-ink">
              Our Mission
            </h2>
            <p className="text-body-lg text-ink-2">{missionFull}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-col gap-5">
            <h2 id="about-vision-title" className="text-balance text-heading-1 text-ink">
              Our Vision
            </h2>
            <p className="text-body-lg text-ink-2">{visionFull}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
