import { TestimonialPanel } from "@/components/domain/TestimonialPanel";
import { getFeaturedTestimonial } from "@/content/fixtures/testimonials";

export function HomeTestimonialPanel() {
  const testimonial = getFeaturedTestimonial();
  if (!testimonial) return null;
  return <TestimonialPanel testimonial={testimonial} titleId="home-testimonial-title" />;
}
