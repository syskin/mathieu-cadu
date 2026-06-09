import Link from "next/link";
import type { Metadata } from "next";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";

const INTRO =
  "Notes d'atelier : retours d'expérience, chantiers, tests d'outils.";

export const metadata: Metadata = {
  title: "Carnet",
  description: INTRO,
};

export default function CarnetPage() {
  const articles = getPublished();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <header>
        <h1 className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold tracking-tight">
          Carnet
        </h1>
        <p className="mt-3 max-w-xl text-muted">{INTRO}</p>
      </header>

      {articles.length === 0 ? (
        <p className="mt-12 text-faint">Rien encore. Bientôt.</p>
      ) : (
        <ul className="mt-12 flex flex-col">
          {articles.map((a) => (
            <li
              key={a.slug}
              className="border-t border-line py-6 first:border-t-0 first:pt-0"
            >
              <Link href={`/carnet/${a.slug}`} className="group block">
                <div className="flex items-center gap-3 text-xs text-faint">
                  <span className="font-medium text-accent">{KIND_LABEL[a.kind]}</span>
                  <span>{frDate(a.date)}</span>
                </div>
                <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {a.title}
                </h2>
                <p className="mt-1 text-muted">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
