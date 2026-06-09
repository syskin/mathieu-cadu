import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Ingénieur logiciel",
  description: site.description,
  sameAs: [site.links.linkedin, site.links.github],
};

const tile =
  "bento-tile tile-depth flex flex-col rounded-xl border border-line bg-surface p-6 hover:border-accent/40";

export default function Home() {
  const latest = getPublished().slice(0, 3);
  const live = projects.filter((p) => p.status === "live").length;
  const killed = projects.filter((p) => p.status === "killed").length;
  const s = (n: number) => (n > 1 ? "s" : "");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
        {/* Identité */}
        <div
          className={`${tile} grid-bg justify-center md:col-span-2`}
          style={{ animationDelay: "0ms" }}
        >
          <p className="font-mono text-xs text-accent">{site.role}</p>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
            Je construis des écosystèmes complets : web, mobile, infra.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Et j&apos;assume mes choix : ceux qui vivent comme ceux que j&apos;ai
            enterrés.
          </p>
        </div>

        {/* Carnet */}
        <div className={tile} style={{ animationDelay: "80ms" }}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Carnet</h2>
            <Link
              href="/carnet"
              className="text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              Tout voir ↗
            </Link>
          </div>
          <ul className="mt-4 flex flex-col gap-4">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link href={`/carnet/${a.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-x-2 font-mono text-[0.7rem] text-faint">
                    <span className="text-accent">{KIND_LABEL[a.kind]}</span>
                    <span>{frDate(a.date)}</span>
                  </div>
                  <span className="mt-1 block text-sm font-medium leading-snug transition-colors group-hover:text-accent">
                    {a.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projets → page dédiée */}
        <Link
          href="/projets"
          className={`${tile} md:col-span-3`}
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Projets</h2>
            <span className="text-sm font-medium text-accent">
              Voir les projets →
            </span>
          </div>
          <p className="mt-2 font-mono text-xs">
            <span className="text-live">{live} en ligne</span>
            {killed > 0 ? (
              <span className="text-muted">
                {" · "}
                <span className="text-killed">
                  {killed} arrêté{s(killed)}
                </span>
              </span>
            ) : null}
          </p>
        </Link>
      </section>
    </main>
  );
}
