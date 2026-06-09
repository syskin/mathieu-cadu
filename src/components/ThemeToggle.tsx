"use client";

export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Changer de thème"
      className="grid size-8 place-items-center rounded-md border border-line text-sm text-muted transition-colors hover:border-accent/40 hover:text-ink"
    >
      <span className="theme-moon" aria-hidden>
        ☾
      </span>
      <span className="theme-sun" aria-hidden>
        ☀
      </span>
    </button>
  );
}
