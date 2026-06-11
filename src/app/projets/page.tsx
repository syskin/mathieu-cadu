import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/projects";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumb } from "@/components/Breadcrumb";

const SURFACE_LABEL: Record<string, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  api: "API",
  infra: "Infra",
  cli: "CLI",
};

const INTRO =
  "Ce que je construis : du web au natif. Ce qui vit, ce que j'ai arrêté, et pourquoi.";

export const metadata: Metadata = {
  title: "Projets",
  description: INTRO,
};

export default function ProjetsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <Breadcrumb crumbs={[{ label: "Accueil", href: "/" }]} current="Projets" />
      <header className="border-b-8 border-ink pb-12">
        <h1 className="font-display text-7xl font-black uppercase tracking-tighter">
          Projets
        </h1>
        <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-muted italic">
          {INTRO}
        </p>
      </header>

      <div className="mt-20 space-y-20">
        {projects.map((p, i) => (
          <section key={p.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Fiche technique */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-12">
              <div className="monolith p-8">
                <StatusBadge status={p.status} />
                <h2 className="mt-6 font-display text-4xl font-black uppercase tracking-tight">
                  {p.name}
                </h2>
                <p className="mt-4 font-mono text-[10px] font-bold text-faint uppercase">{p.dates}</p>

                <div className="mt-10 space-y-6 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <div>
                    <p className="text-faint">Surfaces</p>
                    <p className="mt-2 text-ink">{p.surfaces.map((s) => SURFACE_LABEL[s] ?? s).join(" + ")}</p>
                  </div>
                  {p.build && p.build.metrics.length > 0 && (
                    <div>
                      <p className="text-faint">Chiffres</p>
                      <dl className="mt-2 space-y-1.5">
                        {p.build.metrics.map((m) => (
                          <div key={m.label} className="flex items-baseline justify-between gap-4">
                            <dt className="text-faint font-medium normal-case tracking-normal">{m.label}</dt>
                            <dd className="text-ink">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>

                {p.links.length > 0 && (
                  <div className="mt-12 space-y-3">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block monolith p-4 font-mono text-xs font-black text-center text-accent hover:bg-bg transition-colors"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {p.status === "killed" && p.lesson && (
                <div className="monolith p-8 border-t-8 border-accent">
                  <p className="font-mono text-[10px] font-black tracking-widest text-accent uppercase">Leçon</p>
                  <p className="mt-4 text-sm font-bold leading-relaxed italic">{p.lesson}</p>
                </div>
              )}
            </div>

            {/* Capture + faits */}
            <div className="lg:col-span-8 space-y-8">
              <div className="monolith overflow-hidden aspect-video relative">
                <Image
                  src={`/projects/${p.slug}.webp`}
                  alt={`${p.name}, capture de l'application`}
                  fill
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  className="object-contain"
                />
              </div>

              <div className="monolith p-10">
                <p className="text-2xl font-medium leading-tight text-ink">
                  {p.tagline}
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-widest text-faint uppercase">Problème</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{p.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-widest text-faint uppercase">Décision</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{p.decision}</p>
                  </div>
                </div>
              </div>
            </div>

          </section>
        ))}
      </div>
    </main>
  );
}
