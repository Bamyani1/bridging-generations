import { Link } from "next-view-transitions";
import { footerContent } from "@/content/fixtures/footer";
import { isPlaceholder } from "@/lib/content/isPlaceholder";

const EIN_PLACEHOLDER = "00-0000000";

type FooterProps = {
  ein?: string;
  mailingAddress?: string;
};

export function Footer({ ein, mailingAddress }: FooterProps = {}) {
  const { brand, columns, copyrightNote, legalLinks } = footerContent;
  const year = new Date().getFullYear();
  const einHasRealValue = !isPlaceholder(ein) && ein !== EIN_PLACEHOLDER;
  const showMailingAddress = !isPlaceholder(mailingAddress);

  return (
    <div className="bg-accent text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-[6%]">
        <div>
          <p className="text-heading-5 font-bold">{brand.name}</p>
          <p className="mt-3 text-body-sm text-white/80">{brand.tagline}</p>
          {showMailingAddress ? (
            <p className="mt-4 text-meta text-white/70">{mailingAddress}</p>
          ) : null}
          {einHasRealValue ? (
            <p className="mt-3 text-meta uppercase text-white/70">
              501(c)(3) · EIN {ein} · Tax-deductible
            </p>
          ) : null}
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="text-eyebrow uppercase text-accent-3">{column.heading}</p>
            <ul className="mt-4 flex flex-col gap-2 text-body-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white transition hover:text-accent-3">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 text-meta text-white/80 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-[6%]">
          <p>
            © {year} {copyrightNote}
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-accent-3">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
