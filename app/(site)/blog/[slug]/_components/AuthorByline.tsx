import type { BoardMember } from "@/lib/content/boardMembers";

type AuthorBylineProps = {
  author: BoardMember | null;
};

export function AuthorByline({ author }: AuthorBylineProps) {
  if (!author) {
    return (
      <div className="bg-ground-3 px-4 py-10 sm:px-6 lg:px-[6%]">
        <div className="mx-auto max-w-[820px]">
          <p className="text-meta uppercase text-ink-2">Written by</p>
          <p className="mt-2 text-heading-5 text-ink">The Bridging Generations team</p>
        </div>
      </div>
    );
  }
  return (
    <aside aria-label="About the author" className="bg-ground-3 px-4 py-10 sm:px-6 lg:px-[6%]">
      <div className="mx-auto flex max-w-[820px] flex-col gap-2">
        <p className="text-meta uppercase text-ink-2">Written by</p>
        <p className="text-heading-5 text-ink">{author.name}</p>
        <p className="text-body-sm text-ink-2">{author.role}</p>
        <p className="mt-2 max-w-[60ch] text-body-sm text-ink-2">{author.bio}</p>
      </div>
    </aside>
  );
}
