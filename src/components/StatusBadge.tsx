import type { ProjectStatus } from "@/content/schema";

const META: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "En ligne", className: "text-live" },
  killed: { label: "Arrêté", className: "text-killed" },
  dormant: { label: "En pause", className: "text-dormant" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}
