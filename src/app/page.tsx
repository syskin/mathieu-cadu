import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

const SURFACE_LABEL: Record<string, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  api: "API",
  infra: "Infra",
  cli: "CLI",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Ingénieur logiciel",
  description: site.description,
  sameAs: [site.links.linkedin, site.links.github],
};

const shell = "mx-auto w-full max-w-6xl px-6 sm:px-10";

export default function Home() {
  const latest = getPublished().slice(0, 3);
  const teasers = projects.slice(0, 2);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero — fills the first screen */}
      <section className="grid-bg flex min-h-[78vh] items-center">
        <div className={`${shell} py-20`}>
          <p className="font-mono text-xs text-accent sm:text-sm">{site.role}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,1rem+6vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight">
            Je construis des écosystèmes complets : web, mobile, infra.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            J&apos;assume mes choix : ceux qui vivent comme ceux que j&apos;ai
            enterrés. Et j&apos;écris ce que je fabrique, ici.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
            <Link
              href="/carnet"
              className="text-accent underline-offset-4 hover:underline"
            >
              Le carnet →
            </Link>
            <Link
              href="/projets"
              className="text-accent underline-offset-4 hover:underline"
            >
              Les projets →
            </Link>
          </div>
        </div>
      </section>

      {/* Carnet — rich, clickable */}
      <section className={`${shell} py-20 sm:py-28`}>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Carnet
          </h2>
          <Link
            href="/carnet"
            className="font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            tout voir →
          </Link>
        </div>
        <ul className="mt-10 flex flex-col">
          {latest.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/carnet/${a.slug}`}
                className="group -mx-4 block rounded-xl px-4 py-6 transition-colors hover:bg-surface"
              >
                <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-faint">
                  <span className="text-accent">{KIND_LABEL[a.kind]}</span>
                  <span>{frDate(a.date)}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-2 max-w-2xl text-muted">{a.summary}</p>
                <span className="mt-3 inline-block font-mono text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  lire →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Projets — featured teasers (full detail on /projets) */}
      <section className={`${shell} py-20 sm:py-28`}>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Projets
          </h2>
          <Link
            href="/projets"
            className="font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            tous les projets →
          </Link>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {teasers.map((p) => (
            <Link key={p.slug} href="/projets" className="group block">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-2 font-mono text-xs text-faint">
                {p.dates} · {p.surfaces.map((s) => SURFACE_LABEL[s] ?? s).join(" · ")}
              </p>
              <p className="mt-3 max-w-md text-muted">{p.tagline}</p>
              <span className="mt-3 inline-block font-mono text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                découvrir →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
