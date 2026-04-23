import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-5 px-6 py-24 lg:px-[6%]">
      <p className="text-eyebrow uppercase text-accent">404</p>
      <h1 className="text-display-2 text-ink">We can't find this page</h1>
      <p className="max-w-xl text-body text-ink-2">
        The link may be stale, or the page may have moved. The rest of the site is here — start with
        our students, or head back to the home page.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Button href="/students" variant="primary">
          Meet our students
        </Button>
        <Button href="/" variant="secondary">
          Back home
        </Button>
      </div>
    </div>
  );
}
