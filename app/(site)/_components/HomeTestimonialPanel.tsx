import { TestimonialPanel } from "@/components/domain/TestimonialPanel";
import type { Testimonial } from "@/lib/content/testimonials";

type HomeTestimonialPanelProps = {
  testimonial: Testimonial;
};

export function HomeTestimonialPanel({ testimonial }: HomeTestimonialPanelProps) {
  return <TestimonialPanel testimonial={testimonial} titleId="home-testimonial-title" />;
}
