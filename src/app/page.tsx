import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { StatusBadge } from "@/components/StatusBadge";

const SURFACE_LABEL: Record<string, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  api: "API",
  infra: "Infra",
  cli: "CLI",
};

const STACK_LABEL: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  nextjs: "Next.js",
  reactjs: "React",
  react: "React",
  vuejs: "Vue",
  nuxtjs: "Nuxt",
  supabase: "Supabase",
  postgresql: "PostgreSQL",
  vercel: "Vercel",
  capacitor: "Capacitor",
  tailwindcss: "Tailwind",
  expressjs: "Express",
  fastify: "Fastify",
  strapi: "Strapi",
  docker: "Docker",
  mongodb: "MongoDB",
  ansible: "Ansible",
};
const stackLabel = (s: string) => STACK_LABEL[s] ?? s;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Ingénieur logiciel",
  description: site.description,
  sameAs: [site.links.linkedin, site.links.github],
};

export default function Home() {
  const latest = getPublished().slice(0, 3);
  const killed = projects.filter((p) => p.status === "killed").length;
  const surfaces = [...new Set(projects.flatMap((p) => p.surfaces))];
  const stack = [...new Set(projects.flatMap((p) => p.stack))].slice(0, 8);

  const tile =
    "bento-tile flex flex-col rounded-xl border border-line bg-surface p-6 hover:border-accent/40";

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:[grid-auto-rows:11rem]">
        {/* Identité */}
        <div
          className={`${tile} justify-center sm:col-span-2 md:col-span-3 md:row-span-2`}
          style={{ animationDelay: "0ms" }}
        >
          <p className="text-sm font-semibold text-accent">{site.role}</p>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
            Je construis des écosystèmes complets : web, mobile, infra.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Et j&apos;assume mes choix : ceux qui vivent comme ceux que j&apos;ai
            enterrés.
          </p>
        </div>

        {/* Disponible */}
        <div className={tile} style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2 text-sm font-medium text-live">
            <span className="size-2 rounded-full bg-current" aria-hidden />
            Disponible
          </div>
          <p className="mt-2 text-sm text-muted">Ouvert aux opportunités.</p>
          <div className="mt-auto flex gap-4 pt-4 text-sm font-medium">
            <a
              href={site.links.linkedin}
              className="text-accent underline-offset-4 hover:underline"
            >
              LinkedIn ↗
            </a>
            <a
              href={site.links.github}
              className="text-accent underline-offset-4 hover:underline"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Chiffres */}
        <div className={tile} style={{ animationDelay: "120ms" }}>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            {projects.length}
          </p>
          <p className="text-sm text-muted">projets</p>
          <p className="mt-auto pt-3 text-sm text-faint">
            dont {killed} arrêté{killed > 1 ? "s" : ""}, assumé
            {killed > 1 ? "s" : ""}
          </p>
        </div>

        {/* Carnet */}
        <div
          className={`${tile} sm:col-span-2 md:col-span-1 md:row-span-2`}
          style={{ animationDelay: "180ms" }}
        >
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
                  <span className="text-xs text-accent">{KIND_LABEL[a.kind]}</span>
                  <span className="mt-0.5 block text-sm font-medium leading-snug transition-colors group-hover:text-accent">
                    {a.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Écosystèmes */}
        <Link
          href="#projets"
          className={`${tile} sm:col-span-2 md:col-span-3`}
          style={{ animationDelay: "240ms" }}
        >
          <h2 className="font-display text-lg font-bold tracking-tight">Écosystèmes</h2>
          <p className="mt-1 text-sm text-muted">
            Pas une app, un système : web, mobile, backend, infra autour d&apos;une
            idée.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {surfaces.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-muted"
              >
                {SURFACE_LABEL[s] ?? s}
              </span>
            ))}
          </div>
        </Link>

        {/* Projets */}
        <Link
          href="#projets"
          className={`${tile} sm:col-span-1 md:col-span-2`}
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Projets</h2>
            <span className="text-xs text-faint">{projects.length} projets ↓</span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {projects.slice(0, 4).map((p) => (
              <li key={p.slug} className="font-medium">
                {p.name}
              </li>
            ))}
          </ul>
        </Link>

        {/* Stack */}
        <div className={tile} style={{ animationDelay: "360ms" }}>
          <h2 className="font-display text-lg font-bold tracking-tight">Stack</h2>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {stack.map((s) => (
              <span key={s} className="text-xs text-faint">
                {stackLabel(s)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section dédiée — Projets détaillés */}
      <section id="projets" className="scroll-mt-20 pt-16">
        <h2 className="font-display text-xl font-bold tracking-tight">Projets</h2>
        <ul className="mt-8 flex flex-col">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="border-t border-line py-7 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
                <span className="text-sm text-faint">{p.dates}</span>
              </div>

              <p className="mt-2 max-w-2xl text-muted">{p.tagline}</p>

              <p className="mt-3 text-sm text-faint">
                {p.surfaces.map((s) => SURFACE_LABEL[s] ?? s).join(" · ")}
              </p>
              <p className="mt-1 text-sm text-faint">
                {p.stack.map(stackLabel).join(", ")}
              </p>

              {p.status === "killed" && p.lesson ? (
                <p className="mt-3 max-w-2xl text-sm">
                  <span className="font-semibold text-accent">Leçon : </span>
                  <span className="text-muted">{p.lesson}</span>
                </p>
              ) : null}

              {p.links.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-4">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
