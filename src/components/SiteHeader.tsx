import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="py-10">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display text-2xl font-black uppercase tracking-tighter"
        >
          <Image
            src="/portrait.webp"
            alt={`Portrait de ${site.name}`}
            width={36}
            height={36}
            className="monolith size-9 object-cover transition-transform group-hover:-translate-y-0.5"
          />
          {site.name}
        </Link>
        <nav className="flex items-center gap-8 font-mono text-[10px] font-bold tracking-widest uppercase">
          <Link href="/carnet" className="transition-colors hover:text-accent">
            Carnet
          </Link>
          <Link href="/projets" className="transition-colors hover:text-accent">
            Projets
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
