import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";
import { Breadcrumb } from "@/components/Breadcrumb";

const INTRO =
  "J'écris ici ce que je fabrique : retours d'expérience, chantiers, tests d'outils.";

export const metadata: Metadata = pageMeta({
  title: "Carnet",
  description: INTRO,
  path: "/carnet",
});

export default function CarnetPage() {
  const articles = getPublished();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <Breadcrumb crumbs={[{ label: "Accueil", href: "/" }]} current="Carnet" />
      <header className="border-b-8 border-ink pb-12">
        <h1 className="font-display text-7xl font-black uppercase tracking-tighter">
          Carnet
        </h1>
        <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-muted italic">
          {INTRO}
        </p>
      </header>

      <div className="mt-20">
        {articles.length === 0 ? (
          <p className="text-muted">Rien publié pour l&apos;instant.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/carnet/${a.slug}`}
                className="monolith p-10 sm:p-12 flex flex-col sm:flex-row sm:items-start sm:gap-16 group transition-all hover:bg-surface"
              >
                <div className="shrink-0 sm:w-40 space-y-2 font-mono text-[9px] font-black uppercase">
                  <span className="block text-accent">{KIND_LABEL[a.kind]}</span>
                  <span className="block text-faint">{frDate(a.date)}</span>
                </div>
                <div className="mt-6 sm:mt-0 flex-1">
                  <h2 className="font-display text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-accent">
                    {a.title}
                  </h2>
                  <p className="mt-4 text-muted leading-relaxed font-medium">
                    {a.summary}
                  </p>
                  <div className="mt-8 flex items-center gap-2 font-mono text-[10px] font-black text-accent uppercase tracking-widest">
                    <span>Lire</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
