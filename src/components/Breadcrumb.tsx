import Link from "next/link";
import { site } from "@/lib/site";

type Crumb = { label: string; href: string };

export function Breadcrumb({ crumbs, current }: { crumbs: Crumb[]; current: string }) {
  const back = crumbs[crumbs.length - 1];

  // JSON-LD miroir du fil visible — le dernier élément (page courante) n'a pas d'item.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `${site.url}${c.href === "/" ? "" : c.href}`,
      })),
      { "@type": "ListItem", position: crumbs.length + 1, name: current },
    ],
  };

  return (
    <nav aria-label="Fil d'ariane" className="flex items-center gap-6 mb-12 font-mono text-[10px] font-black tracking-widest uppercase">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href={back.href}
        className="flex items-center gap-1.5 text-accent hover:underline"
      >
        ← {back.label}
      </Link>
      <span className="text-line/40">|</span>
      <ol className="flex items-center gap-1.5 text-faint">
        {crumbs.map((c) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <Link href={c.href} className="hover:text-accent transition-colors">
              {c.label}
            </Link>
            <span className="text-line/40">/</span>
          </li>
        ))}
        <li className="text-ink">{current}</li>
      </ol>
    </nav>
  );
}
