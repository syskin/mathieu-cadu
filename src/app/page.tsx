import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

const shell = "mx-auto w-full max-w-6xl px-6";

export default function Home() {
  const latest = getPublished().slice(0, 3);
  const [featured, ...others] = projects.slice(0, 3);

  return (
    <main className="flex-1 pb-24 sm:pb-32">
      <div className={`${shell} mt-12 sm:mt-20`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Identité */}
          <section className="md:col-span-8 monolith p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <p className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
              {site.role}
            </p>
            <h1 className="mt-8 font-display text-[clamp(2.5rem,1rem+6vw,5.5rem)] font-black leading-[0.9] tracking-tighter uppercase">
              Des produits<br />faits maison.
            </h1>
            <p className="mt-10 max-w-xl text-xl font-medium leading-relaxed text-muted">
              Web, mobile, jusqu&apos;à la prod : je les fabrique en entier. Ici je raconte ce qui tourne, ce qui s&apos;est arrêté, et ce que j&apos;en retiens.
            </p>
            <div className="mt-12 flex flex-wrap gap-8 font-mono text-xs font-bold tracking-widest uppercase">
              <Link href="/carnet" className="text-accent hover:underline">Carnet →</Link>
              <Link href="/projets" className="text-accent hover:underline">Projets →</Link>
            </div>
          </section>

          {/* Repères */}
          <section className="md:col-span-4 monolith flex flex-col border-t-8 border-accent overflow-hidden">
            <div className="aspect-[5/4] relative border-b border-line/30">
              <Image
                src="/portrait.webp"
                alt={`Portrait de ${site.name}`}
                fill
                sizes="(min-width: 768px) 28vw, 100vw"
                loading="eager"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
            <h2 className="font-mono text-[10px] font-bold tracking-widest text-accent uppercase border-b border-line/30 pb-4">
              Repères
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="font-mono text-[9px] font-bold text-faint uppercase tracking-widest">Base</p>
                <p className="mt-1 text-lg font-bold uppercase tracking-tight">{site.location}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold text-faint uppercase tracking-widest">Terrain</p>
                <p className="mt-1 text-lg font-bold uppercase tracking-tight">Web · Mobile</p>
              </div>
            </div>
            <div className="mt-auto pt-8 flex gap-6 font-mono text-[10px] font-black text-accent uppercase">
              <a href={site.links.linkedin} target="_blank" rel="noopener" className="hover:underline">LinkedIn ↗</a>
              <a href={site.links.github} target="_blank" rel="noopener" className="hover:underline">GitHub ↗</a>
            </div>
            </div>
          </section>

          {/* Projets */}
          <section className="md:col-span-12 flex items-end justify-between border-b-4 border-ink pb-4 mt-4">
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter">Projets</h2>
            <Link href="/projets" className="font-mono text-[10px] font-bold text-accent uppercase hover:underline">Tous les projets →</Link>
          </section>

          {/* Projet en avant */}
          <Link href="/projets" className="md:col-span-7 monolith group flex flex-col transition-transform hover:-translate-y-1 overflow-hidden">
            <div className="aspect-[16/9] relative overflow-hidden border-b border-line/30">
              <Image
                src={`/projects/${featured.slug}.webp`}
                alt={`${featured.name}, capture de l'application`}
                fill
                sizes="(min-width: 768px) 56vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4">
                <h3 className="font-display text-3xl font-black uppercase tracking-tight group-hover:text-accent">
                  {featured.name}
                </h3>
                <StatusBadge status={featured.status} />
              </div>
              <p className="mt-3 text-sm text-muted font-medium">{featured.tagline}</p>
              <div className="mt-auto pt-6 flex items-center justify-between font-mono text-[10px] font-bold uppercase">
                <span className="text-accent">{featured.dates}</span>
                <span className="text-faint">{featured.surfaces.join(" / ")}</span>
              </div>
            </div>
          </Link>

          {/* Projets secondaires */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {others.map((p) => (
              <Link key={p.slug} href="/projets" className="monolith group flex-1 flex items-stretch transition-transform hover:-translate-y-1 overflow-hidden">
                <div className="w-1/3 relative overflow-hidden border-r border-line/30">
                  <Image
                    src={`/projects/${p.slug}-thumb.webp`}
                    alt={`${p.name}, capture de l'application`}
                    fill
                    sizes="(min-width: 768px) 14vw, 33vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-black uppercase tracking-tight group-hover:text-accent">
                      {p.name}
                    </h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted font-medium line-clamp-2">{p.tagline}</p>
                  <p className="mt-4 font-mono text-[9px] font-bold text-faint uppercase">
                    {p.dates} · {p.surfaces.join(" / ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Carnet */}
          <section className="md:col-span-12 flex items-end justify-between border-b-4 border-ink pb-4 mt-4">
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter">Dernières notes</h2>
            <Link href="/carnet" className="font-mono text-[10px] font-bold text-accent uppercase hover:underline">Tout le carnet →</Link>
          </section>

          {latest.map((a) => (
            <Link
              key={a.slug}
              href={`/carnet/${a.slug}`}
              className={`monolith group p-8 sm:p-10 flex flex-col transition-transform hover:-translate-y-1 ${
                latest.length === 1 ? "md:col-span-12 sm:flex-row sm:items-baseline sm:gap-12" : "md:col-span-4"
              }`}
            >
              <div className="flex shrink-0 items-baseline gap-4 font-mono text-[10px] font-bold uppercase">
                <span className="text-accent">{KIND_LABEL[a.kind]}</span>
                <span className="text-faint">{frDate(a.date)}</span>
              </div>
              <div className="mt-4 sm:mt-0 flex-1">
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-muted leading-relaxed">{a.summary}</p>
              </div>
              <span className="mt-6 sm:mt-0 shrink-0 font-mono text-[10px] font-bold text-accent uppercase tracking-widest">
                Lire la note →
              </span>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}
