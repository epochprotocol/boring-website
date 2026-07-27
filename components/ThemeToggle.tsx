"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "mix" | "dark";

const THEMES: { id: Theme; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "mix", label: "Mix" },
  { id: "dark", label: "Dark" },
];

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "mix");
  if (t === "dark") root.classList.add("dark");
  if (t === "mix") root.classList.add("mix");
  try {
    localStorage.setItem("epoch-theme", t);
  } catch {}
}

function ThemeIcon({ id }: { id: Theme }) {
  if (id === "light") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (id === "dark") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    );
  }
  // mix — half-filled circle (blend of light + dark)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 000 17z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const c = document.documentElement.classList;
    setTheme(c.contains("dark") ? "dark" : c.contains("mix") ? "mix" : "light");
  }, []);

  function choose(t: Theme) {
    setTheme(t);
    applyTheme(t);
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-line-strong p-0.5 ${className}`}
    >
      {THEMES.map(({ id, label }) => {
        const active = mounted && theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => choose(id)}
            aria-pressed={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              active
                ? "bg-accent text-on-accent"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <ThemeIcon id={id} />
          </button>
        );
      })}
    </div>
  );
}
