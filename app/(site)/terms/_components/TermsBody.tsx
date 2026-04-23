import { MDXRenderer } from "@/components/content/MDXRenderer";

type TermsBodyProps = {
  source: string;
};

export function TermsBody({ source }: TermsBodyProps) {
  return (
    <article className="mx-auto max-w-[70ch]">
      <MDXRenderer source={source} />
    </article>
  );
}
