import { getRecentActivities } from "@/lib/content/activities";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getSiteSettings } from "@/lib/content/siteSettings";
import { getStatsSnapshot } from "@/lib/content/statsSnapshot";
import { getSpotlightStudents } from "@/lib/content/students";
import { getFeaturedSuccessStory } from "@/lib/content/successStories";
import { getFeaturedTestimonial } from "@/lib/content/testimonials";
import { HomeActivities } from "./_components/HomeActivities";
import { HomeCTAFooter } from "./_components/HomeCTAFooter";
import { HomeHero } from "./_components/HomeHero";
import { HomeMissionBand } from "./_components/HomeMissionBand";
import { HomeProgramsGrid } from "./_components/HomeProgramsGrid";
import { HomeSpotlightScroller } from "./_components/HomeSpotlightScroller";
import { HomeStatsTrio } from "./_components/HomeStatsTrio";
import { HomeSuccessPanel } from "./_components/HomeSuccessPanel";
import { HomeTestimonialPanel } from "./_components/HomeTestimonialPanel";

export default async function Home() {
  const [stats, settings, projects, story, activities, students, testimonial] = await Promise.all([
    getStatsSnapshot(),
    getSiteSettings(),
    getFeaturedProjects(2),
    getFeaturedSuccessStory(),
    getRecentActivities(2),
    getSpotlightStudents(6),
    getFeaturedTestimonial(),
  ]);

  return (
    <>
      <HomeHero stats={stats} />
      <HomeMissionBand missionFull={settings.missionFull} />
      <HomeStatsTrio stats={stats} />
      <HomeProgramsGrid projects={projects} />
      {story ? <HomeSuccessPanel story={story} /> : null}
      <HomeActivities activities={activities} />
      <HomeSpotlightScroller students={students} />
      {testimonial ? <HomeTestimonialPanel testimonial={testimonial} /> : null}
      <HomeCTAFooter />
    </>
  );
}
