import Link from "next/link";
import type { Metadata } from "next";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";

const INTRO =
  "J'écris ici ce que je fabrique : retours d'expérience, chantiers, tests d'outils.";

export const metadata: Metadata = {
  title: "Carnet",
  description: INTRO,
};

export default function CarnetPage() {
  const articles = getPublished();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <header className="border-b-8 border-ink pb-12">
        <h1 className="font-display text-7xl font-black uppercase tracking-tighter">
          Carnet
        </h1>
        <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-muted italic">
          {INTRO}
        </p>
      </header>

      <div className="mt-16">
        {articles.length === 0 ? (
          <p className="text-muted">Rien publié pour l&apos;instant.</p>
        ) : (
          <div className={`grid grid-cols-1 gap-8 ${articles.length >= 2 ? "md:grid-cols-2" : ""} ${articles.length >= 3 ? "lg:grid-cols-3" : ""}`}>
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/carnet/${a.slug}`}
                className={`monolith p-10 flex flex-col group transition-all hover:bg-surface ${
                  articles.length === 1 ? "sm:flex-row sm:items-baseline sm:gap-12" : ""
                }`}
              >
                <div className="flex shrink-0 items-baseline gap-4 font-mono text-[9px] font-black uppercase">
                  <span className="text-accent">{KIND_LABEL[a.kind]}</span>
                  <span className="text-faint">{frDate(a.date)}</span>
                </div>
                <div className="mt-6 sm:mt-0 flex-1">
                  <h2 className="font-display text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-accent">
                    {a.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-muted leading-relaxed font-medium">
                    {a.summary}
                  </p>
                </div>
                <div className="mt-10 sm:mt-0 flex shrink-0 items-center gap-3 font-mono text-xs font-black text-accent uppercase tracking-widest">
                  <span>Lire la note</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
