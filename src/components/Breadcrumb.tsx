import Link from "next/link";

type Crumb = { label: string; href: string };

export function Breadcrumb({ crumbs, current }: { crumbs: Crumb[]; current: string }) {
  const back = crumbs[crumbs.length - 1];

  return (
    <nav aria-label="Fil d'ariane" className="flex items-center gap-6 mb-12 font-mono text-[10px] font-black tracking-widest uppercase">
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
