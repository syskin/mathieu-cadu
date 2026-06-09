import type { Metadata } from "next";
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

const INTRO =
  "Ce que je construis : du web au natif à l'infra. Ce qui vit, ce que j'ai arrêté, et pourquoi.";

export const metadata: Metadata = {
  title: "Projets",
  description: INTRO,
};

export default function ProjetsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <header>
        <h1 className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold tracking-tight">
          Projets
        </h1>
        <p className="mt-3 max-w-xl text-muted">{INTRO}</p>
      </header>

      <ul className="mt-12 flex flex-col">
        {projects.map((p) => (
          <li
            key={p.slug}
            className="border-t border-line py-7 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                {p.name}
              </h2>
              <StatusBadge status={p.status} />
              <span className="font-mono text-xs text-faint">{p.dates}</span>
            </div>

            <p className="mt-2 max-w-2xl text-muted">{p.tagline}</p>

            <p className="mt-3 font-mono text-xs text-faint">
              {p.surfaces.map((surface) => SURFACE_LABEL[surface] ?? surface).join(" · ")}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">
              {p.stack.map(stackLabel).join(" · ")}
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
    </main>
  );
}
