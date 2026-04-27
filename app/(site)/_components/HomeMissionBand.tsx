import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type HomeMissionBandProps = {
  missionFull: string;
};

export function HomeMissionBand({ missionFull }: HomeMissionBandProps) {
  return (
    <section
      id="mission"
      aria-labelledby="home-mission-title"
      className="scroll-mt-20 overflow-hidden bg-ground-3 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <Reveal stagger="up">
          <div className="flex max-w-[55ch] flex-col gap-5">
            <Eyebrow>Our mission</Eyebrow>
            <h2 id="home-mission-title" className="text-balance text-heading-3 text-ink">
              {missionFull}
            </h2>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
