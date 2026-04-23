import Image from "next/image";
import { Link } from "next-view-transitions";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedSuccessStory } from "@/content/fixtures/successStories";

export function HomeSuccessPanel() {
  const story = getFeaturedSuccessStory();
  if (!story) return null;

  return (
    <section
      aria-labelledby="home-success-title"
      className="grid grid-cols-1 items-stretch bg-ground-3 lg:grid-cols-2"
    >
      <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-ground-2 lg:aspect-auto lg:min-h-[640px]">
        <Image
          src={story.portrait.src}
          alt={story.portrait.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ filter: "saturate(1.02)" }}
        />
      </Reveal>
      <Reveal
        delay={150}
        className="flex flex-col justify-center gap-6 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-24"
      >
        <Eyebrow>A success story</Eyebrow>
        <blockquote className="flex flex-col gap-6">
          <p id="home-success-title" className="text-balance text-heading-2 text-ink">
            &ldquo;{story.pullQuote}&rdquo;
          </p>
          <footer className="flex flex-col gap-1">
            <cite className="not-italic text-heading-5 text-ink">{story.subjectName}</cite>
            <span className="text-meta uppercase text-ink-2">{story.subjectRole}</span>
          </footer>
        </blockquote>
        <Link
          href={`/success-stories/${story.slug}`}
          className="group inline-flex items-center gap-1 text-nav-link uppercase text-accent transition hover:text-accent-2-text"
        >
          Read {story.subjectName}&rsquo;s story
          <span
            aria-hidden="true"
            className="transition-transform motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
