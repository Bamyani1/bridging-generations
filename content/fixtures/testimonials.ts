export type SpeakerRole =
  | "parent"
  | "teacher"
  | "student"
  | "alum"
  | "board"
  | "partner"
  | "volunteer"
  | "donor";

export type Testimonial = {
  id: string;
  quote: string;
  speakerName: string;
  speakerTitle?: string;
  speakerRole: SpeakerRole;
  speakerPhoto?: { src: string; alt: string };
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "home-featured-teacher",
    quote:
      "The year a sponsorship arrives is the year we stop losing a student mid-term. Bridging Generations is what lets our classroom hold its shape.",
    speakerName: "Mrs. Thaung",
    speakerTitle: "Principal, Thanchi High School",
    speakerRole: "teacher",
    featured: true,
  },
];

export function getFeaturedTestimonial(): Testimonial | undefined {
  const featured = testimonials.find((t) => t.featured);
  return featured ?? testimonials[0];
}
