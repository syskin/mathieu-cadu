import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line/70">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5">
        <Link
          href="/"
          className="font-display text-[1.0625rem] font-bold tracking-tight"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/ecrits" className="transition-colors hover:text-ink">
            Écrits
          </Link>
          <Link href="/#travaux" className="transition-colors hover:text-ink">
            Travaux
          </Link>
          <a href={site.links.github} className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={site.links.linkedin} className="transition-colors hover:text-ink">
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
