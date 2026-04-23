type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbList(siteUrl: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.url, siteUrl).toString(),
    })),
  };
}

type CollectionPageArgs = {
  siteUrl: string;
  url: string;
  name: string;
  description?: string;
};

export function collectionPage({ siteUrl, url, name, description }: CollectionPageArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: new URL(url, siteUrl).toString(),
    name,
    ...(description ? { description } : {}),
  };
}

type ArticleArgs = {
  siteUrl: string;
  url: string;
  headline: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  publisherName: string;
};

export function articleLd({
  siteUrl,
  url,
  headline,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  publisherName,
}: ArticleArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url: new URL(url, siteUrl).toString(),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    ...(imageUrl ? { image: new URL(imageUrl, siteUrl).toString() } : {}),
    publisher: { "@type": "Organization", name: publisherName },
  };
}
