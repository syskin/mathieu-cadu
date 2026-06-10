import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-end gap-4 px-6 py-10">
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
  );
}
