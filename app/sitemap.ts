import { bottlenecks } from "@/lib/bottlenecks";
import { isGithubPages } from "@/lib/hosting";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

function pageUrl(base: string, path: string) {
  if (!isGithubPages) return path ? `${base}${path}` : base;
  return path ? `${base}${path}/` : `${base}/`;
}

export default function sitemap() {
  const base = getSiteUrl();
  const now = new Date();
  return [
    { url: pageUrl(base, ""), lastModified: now },
    { url: pageUrl(base, "/quiz"), lastModified: now },
    { url: pageUrl(base, "/digest"), lastModified: now },
    { url: pageUrl(base, "/legal/disclaimer"), lastModified: now },
    ...bottlenecks.map((item) => ({
      url: pageUrl(base, `/b/${item.slug}`),
      lastModified: now,
    })),
  ];
}
