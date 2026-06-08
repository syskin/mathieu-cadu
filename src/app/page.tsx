import { site } from "@/lib/site";
import { projects } from "@/content/projects";

// Minimal honest placeholder. UI is the next iteration (see docs/strategy.md).
// JSON-LD ships now so SEO/structured data is correct from commit 1.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Ingénieur produit",
  description: site.description,
};

export default function Home() {
  return (
    <main className="flex flex-1 w-full max-w-2xl mx-auto flex-col justify-center gap-6 px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Ingénieur produit. Le code est un moyen, la décision produit est le métier.
        Je construis des écosystèmes complets et j&apos;assume mes choix.
      </p>
      <p className="text-sm text-zinc-500">
        Site en construction — {projects.length} projets en cours de documentation.
      </p>
    </main>
  );
}
