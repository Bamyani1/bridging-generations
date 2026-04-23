import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { ActivityCard } from "@/components/domain/ActivityCard";
import { BlogPostCard } from "@/components/domain/BlogPostCard";
import { BoardMemberCard } from "@/components/domain/BoardMemberCard";
import { GalleryItem } from "@/components/domain/GalleryItem";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { StudentCard } from "@/components/domain/StudentCard";
import { SuccessStoryCard } from "@/components/domain/SuccessStoryCard";
import type { Activity } from "@/lib/content/activities";
import type { BlogPost } from "@/lib/content/blogPosts";
import type { BoardMember } from "@/lib/content/boardMembers";
import type { GalleryImage } from "@/lib/content/galleryImages";
import type { Project } from "@/lib/content/projects";
import type { Student } from "@/lib/content/students";
import type { SuccessStory } from "@/lib/content/successStories";

const project: Project = {
  id: "demo",
  title: "Demo",
  summary: "Summary",
  body: "Body",
  fundingGoal: 1000,
  fundingRaised: 400,
  status: "active",
  heroImage: { src: "/p.jpg", alt: "p" },
  order: 1,
};

const activity = {
  id: "a",
  title: "Activity",
  excerpt: "Excerpt",
  tag: "fundraiser",
  publishedAt: "2026-01-15T00:00:00.000Z",
  coverImage: { src: "/a.jpg", alt: "a" },
  body: "Body",
  published: true,
} as unknown as Activity;

const student: Student = {
  id: "s1",
  displayName: "Anika",
  schoolId: "demo-school",
  grade: 8,
  community: "marma",
  quote: "Short aspiration.",
  portrait: { src: "/demo.jpg", alt: "Portrait" },
  consent: {
    portraitReleaseStatus: "granted",
    storyReleaseStatus: "granted",
    consentScope: ["website"],
    revokable: true,
    signedDate: "2025-09-01",
    releaseFormId: "BG-REL-2025-001",
    revokedAt: null,
  },
  sponsorshipStatus: "sponsored",
  enrolledAt: "2025-01-01",
};

const successStory = {
  slug: "story",
  subjectName: "Subject",
  subjectRole: "Alum",
  pullQuote: "A great story",
  portrait: { src: "/s.jpg", alt: "s" },
  body: "Body",
  published: true,
  publishedAt: "2026-01-01T00:00:00.000Z",
} as unknown as SuccessStory;

const post = {
  slug: "post",
  title: "Post title",
  excerpt: "An excerpt.",
  coverImage: { src: "/cover.jpg", alt: "cover" },
  published: true,
  publishedAt: "2026-01-05T00:00:00.000Z",
} as unknown as BlogPost;

const boardMember: BoardMember = {
  id: "b1",
  name: "Jane Doe",
  role: "Director",
  bio: "Bio",
  portrait: { src: "/b.jpg", alt: "portrait" },
  order: 1,
};

const galleryImage: GalleryImage = {
  id: "g1",
  caption: "Morning class",
  image: { src: "/g.jpg", alt: "students" },
  width: 400,
  height: 300,
  takenAt: "2026-01-01",
  location: "Bandarban",
};

type Spec = {
  name: string;
  render: () => { container: HTMLElement };
  hasTitle: boolean;
};

const specs: Spec[] = [
  {
    name: "ProgramCard",
    render: () => render(<ProgramCard project={project} />),
    hasTitle: true,
  },
  {
    name: "ActivityCard",
    render: () => render(<ActivityCard activity={activity} />),
    hasTitle: true,
  },
  {
    name: "StudentCard",
    render: () => render(<StudentCard student={student} />),
    hasTitle: true,
  },
  {
    name: "SuccessStoryCard",
    render: () => render(<SuccessStoryCard story={successStory} showPortrait={false} />),
    hasTitle: true,
  },
  {
    name: "BlogPostCard (default)",
    render: () => render(<BlogPostCard post={post} />),
    hasTitle: true,
  },
  {
    name: "BlogPostCard (featured)",
    render: () => render(<BlogPostCard post={post} variant="featured" />),
    hasTitle: true,
  },
  {
    name: "BoardMemberCard",
    render: () => render(<BoardMemberCard member={boardMember} />),
    hasTitle: true,
  },
  {
    name: "GalleryItem",
    render: () => render(<GalleryItem item={galleryImage} />),
    hasTitle: false,
  },
];

describe("card-hover contract", () => {
  for (const spec of specs) {
    it(`${spec.name} root exposes card-hover`, () => {
      const { container } = spec.render();
      expect(container.querySelector(".card-hover")).not.toBeNull();
    });

    if (spec.hasTitle) {
      it(`${spec.name} exposes a card-title element`, () => {
        const { container } = spec.render();
        expect(container.querySelector(".card-title")).not.toBeNull();
      });
    } else {
      it(`${spec.name} does not inject a card-title`, () => {
        const { container } = spec.render();
        expect(container.querySelector(".card-title")).toBeNull();
      });
    }
  }
});
