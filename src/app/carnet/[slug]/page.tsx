import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getArticle, getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublished().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const published = getPublished().find((a) => a.slug === slug);
  if (!published) return {};
  return pageMeta({
    title: published.title,
    description: published.summary,
    path: `/carnet/${slug}`,
    article: { publishedTime: published.date, tags: published.tags },
  });
}

const mdxOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
};

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  if (!getPublished().some((a) => a.slug === slug)) notFound();

  const { meta, content } = getArticle(slug);

  // JSON-LD BlogPosting — author pointe sur le Person déclaré dans le layout.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    inLanguage: site.lang,
    url: `${site.url}/carnet/${slug}`,
    author: { "@id": `${site.url}/#person` },
    ...(meta.tags.length > 0 && { keywords: meta.tags.join(", ") }),
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumb
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Carnet", href: "/carnet" }]}
        current={meta.title}
      />
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Editorial Sidebar */}
        <aside className="lg:col-span-4 space-y-8 sticky top-12">
          <div className="monolith p-8">
            <div className="flex items-center justify-between font-mono text-[10px] font-bold text-faint uppercase">
              <span className="text-accent">{KIND_LABEL[meta.kind]}</span>
              <span>{frDate(meta.date)}</span>
            </div>
            <h1 className="mt-8 font-display text-4xl font-black uppercase tracking-tighter leading-none">
              {meta.title}
            </h1>
            <p className="mt-6 text-lg font-medium text-muted leading-tight italic">
              {meta.summary}
            </p>
            
            {meta.tags && meta.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-line/30">
                <p className="font-mono text-[9px] font-bold text-faint uppercase tracking-widest">Mots-clés</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {meta.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-bg border border-line text-[9px] font-mono font-bold uppercase text-muted">#{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Note Content */}
        <div className="lg:col-span-8 monolith px-10 py-12 sm:px-16 sm:py-16">
          <div className="prose-craft">
            <MDXRemote source={content} options={mdxOptions} />
          </div>
          
          <footer className="mt-16 pt-10 border-t border-line/30 flex justify-end">
             <Link href="/carnet" className="font-mono text-[10px] font-black text-accent uppercase hover:underline">← Retour au carnet</Link>
          </footer>
        </div>

      </article>
    </main>
  );
}
