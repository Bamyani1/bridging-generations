import Image from "next/image";
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
      className="scroll-mt-20 bg-ground-3 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger="up">
            <div className="flex flex-col gap-5">
              <Eyebrow>Our mission</Eyebrow>
              <h2 id="home-mission-title" className="text-balance text-heading-3 text-ink">
                {missionFull}
              </h2>
            </div>
          </Reveal>
          <Reveal stagger="right" delay={150}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground-2">
              <Image
                src="/home-mission.jpg"
                alt="A schoolboy in uniform sits in a library corner reading a book"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
