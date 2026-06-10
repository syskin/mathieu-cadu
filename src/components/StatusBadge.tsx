import type { ProjectStatus } from "@/content/schema";

const META: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "En ligne", className: "bg-accent text-white" },
  killed: { label: "Arrêté", className: "bg-faint text-white" },
  dormant: { label: "En pause", className: "bg-faint text-white" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = META[status];
  return (
    <span className={`inline-block px-2 py-0.5 font-mono text-[9px] font-black tracking-widest uppercase ${className}`}>
      {label}
    </span>
  );
}
