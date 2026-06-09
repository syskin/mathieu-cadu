import { site } from "@/lib/site";
import { projects } from "@/content/projects";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6">
        <span className="font-display text-[1.0625rem] font-bold tracking-tight">
          {site.name}
        </span>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <a href={site.links.github} className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={site.links.linkedin} className="transition-colors hover:text-ink">
            LinkedIn
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <section className="py-16 sm:py-24">
          <p className="text-sm font-semibold text-accent">{site.role}</p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,1.4rem+3.4vw,3.75rem)] font-extrabold leading-[1.04] tracking-tight">
            Je construis des écosystèmes complets : web, mobile, infra.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Et j&apos;assume mes choix : ceux qui vivent comme ceux que j&apos;ai
            enterrés.
          </p>
        </section>

        <section className="border-t border-line py-12">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold tracking-tight">Travaux</h2>
            <span className="text-sm text-faint">{projects.length} projets</span>
          </div>

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
                <p className="mt-1 text-sm text-faint">{p.stack.join(", ")}</p>

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

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <p className="text-sm text-muted">Disponible pour échanger.</p>
          <nav className="flex gap-5 text-sm font-medium">
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
          </nav>
        </div>
      </footer>
    </>
  );
}
