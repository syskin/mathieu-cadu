import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getArticle, getPublished } from "@/lib/writing";
import { KIND_LABEL } from "@/content/writing/schema";
import { frDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublished().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const published = getPublished().find((a) => a.slug === slug);
  if (!published) return {};
  return { title: published.title, description: published.summary };
}

const mdxOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
};

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  if (!getPublished().some((a) => a.slug === slug)) notFound();

  const { meta, content } = getArticle(slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <article>
        <header className="border-b border-line pb-8">
          <div className="flex items-center gap-3 text-sm text-faint">
            <span className="font-medium text-accent">{KIND_LABEL[meta.kind]}</span>
            <span>{frDate(meta.date)}</span>
          </div>
          <h1 className="mt-3 font-display text-[clamp(2rem,1.3rem+2.6vw,3rem)] font-extrabold leading-[1.08] tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{meta.summary}</p>
        </header>

        <div className="prose-craft mt-10">
          <MDXRemote source={content} options={mdxOptions} />
        </div>
      </article>
    </main>
  );
}
