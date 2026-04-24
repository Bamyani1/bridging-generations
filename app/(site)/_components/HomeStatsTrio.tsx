import { StatCard } from "@/components/domain/StatCard";
import { Reveal } from "@/components/ui/Reveal";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

type HomeStatsTrioProps = {
  stats: StatsSnapshot;
};

export function HomeStatsTrio({ stats }: HomeStatsTrioProps) {
  return (
    <section
      id="stats"
      aria-label="Program reach at a glance"
      className="scroll-mt-20 bg-ground-3 pb-20 lg:pb-32"
    >
      <div className="mx-auto max-w-[1280px] border-t border-hairline px-4 pt-16 sm:px-6 lg:px-[6%] lg:pt-24">
        <Reveal
          cascade
          cascadeDelay={180}
          className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-16"
        >
          <StatCard value={stats.studentCount} label="Students sponsored" />
          <StatCard value={stats.schoolCount} label="Partner schools" />
          <StatCard value={stats.donorCount} label="Donors & counting" />
        </Reveal>
      </div>
    </section>
  );
}
