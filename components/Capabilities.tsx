"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SectionHeader } from "./SectionHeader";
import { DOCS_URL } from "@/lib/site";

type Capability = {
  id: string;
  label: string;
  desc: string;
  icon: "crossChain" | "swap" | "shield" | "lock" | "layers" | "boxCheck";
  step: string;
};

const CAPABILITIES: Capability[] = [
  {
    id: "bridge",
    label: "Cross-chain",
    desc: "Route value across supported networks.",
    icon: "crossChain",
    step: "bridge",
  },
  {
    id: "swap",
    label: "Swap & acquire",
    desc: "Land in the exact asset or position.",
    icon: "swap",
    step: "swap",
  },
  {
    id: "compliance",
    label: "Compliance",
    desc: "KYC, sanctions, and policy screening.",
    icon: "shield",
    step: "compliance",
  },
  {
    id: "privacy",
    label: "Private settlement",
    desc: "Confidential flows, powered by Miden.",
    icon: "lock",
    step: "privatize",
  },
  {
    id: "compose",
    label: "Composed flows",
    desc: "Chain actions into one atomic outcome.",
    icon: "layers",
    step: "compose",
  },
  {
    id: "settle",
    label: "Settle & confirm",
    desc: "Verified result to your systems.",
    icon: "boxCheck",
    step: "settle",
  },
];

/** The order the composer builds the default request in. */
const AUTOPLAY: string[] = ["bridge", "swap", "compliance"];

const c = {
  kw: "tok-kw",
  fn: "text-accent-strong",
  str: "text-[color:var(--color-teal)]",
  com: "text-muted",
  punc: "text-ink-soft",
};

export function Capabilities() {
  const [selected, setSelected] = useState<string[]>(AUTOPLAY);
  const [touched, setTouched] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  /**
   * Stripe's developer sections build their code sample as you arrive at
   * them, so the reader watches the request being composed rather than
   * finding it already written. This does the same: on first scroll-in the
   * composer empties and re-adds each capability in order, and the matching
   * control lights up as its step lands.
   *
   * Three rules keep it from being annoying:
   *  - It runs once, and only when the section is actually reached.
   *  - The moment the reader touches a control, autoplay is abandoned for
   *    good. Their intent outranks the demo.
   *  - Under reduced motion it never runs; the finished request is simply
   *    there, which is the same end state.
   */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (!document.documentElement.classList.contains("motion")) return;

    let timers: number[] = [];
    let played = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played) return;
          played = true;
          observer.disconnect();

          setSelected((current) => (current.length ? [] : current));
          AUTOPLAY.forEach((id, i) => {
            timers.push(
              window.setTimeout(() => {
                setSelected((current) =>
                  current.includes(id) ? current : [...current, id]
                );
              }, 320 + i * 420)
            );
          });
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };
  }, []);

  const toggle = (id: string) => {
    setTouched(true);
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const steps = CAPABILITIES.filter((cap) => selected.includes(cap.id)).map(
    (cap) => cap.step
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      data-composer={touched ? "manual" : "auto"}
      className="section border-b border-line bg-surface-2"
    >
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Compose"
          title="Pick capabilities. Epoch composes the outcome."
          lead="Toggle what you need. One API—no extra services to maintain."
        />

        <div className="panel section-body grid gap-0 overflow-hidden lg:grid-cols-[1.1fr_1fr]">
          {/* Selector */}
          <div className="p-6 md:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => {
                const active = selected.includes(cap.id);
                return (
                  <button
                    key={cap.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(cap.id)}
                    className={`group flex items-start gap-3 rounded-[var(--radius-control)] border p-4 text-left transition-colors ${
                      active
                        ? "border-accent bg-accent-soft"
                        : "border-line hover:border-line-strong bg-surface"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-tile)] transition-colors ${
                        active
                          ? "bg-accent text-on-accent"
                          : "bg-surface-2 text-ink-soft"
                      }`}
                    >
                      <Icon name={cap.icon} className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                        {cap.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted">
                        {cap.desc}
                      </span>
                    </span>
                    <span
                      className={`ml-auto mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors ${
                        active
                          ? "border-accent bg-accent text-on-accent"
                          : "border-line-strong text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tick h-2.5 w-2.5"
                        data-checked={active}
                      >
                        <path d="M2.5 6.5l2.5 2.5 4.5-5" pathLength={1} />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link mt-6"
            >
              Full API reference
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>

          {/* Live preview */}
          <div className="on-dark border-t border-line lg:border-l lg:border-t-0">
            {/* Traffic-light dots were skeuomorphic filler. A filename and a
                POST label say more in less space. */}
            <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
              <span className="label">request.ts</span>
              <span className="label text-accent-strong">POST /v1/solve</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className={c.kw}>await</span>{" "}
                <span className={c.punc}>epoch</span>.
                <span className={c.fn}>solve</span>
                <span className={c.punc}>({"{"}</span>
                {"\n"}
                {"  "}outcome<span className={c.punc}>:</span>{" "}
                <span className={c.str}>&quot;acquire&quot;</span>
                <span className={c.punc}>,</span>
                {"\n"}
                {"  "}from<span className={c.punc}>:</span>{" "}
                <span className={c.str}>&quot;any&quot;</span>
                <span className={c.punc}>,</span>{" "}
                <span className={c.com}>{"// any chain, token, or fiat"}</span>
                {"\n"}
                {"  "}steps<span className={c.punc}>:</span>{" "}
                <span className={c.punc}>[</span>
                {steps.length === 0 ? (
                  <>
                    {"\n"}
                    {"    "}
                    <span className={c.com}>
                      {"// select capabilities \u2190"}
                    </span>
                  </>
                ) : (
                  steps.map((s) => (
                    <span key={s}>
                      {"\n"}
                      {"    "}
                      {/* Keyed by step, so a newly added step mounts a fresh
                          node and the wipe plays exactly once, for that
                          line, without any imperative animation code. */}
                      <span className="code-line">
                        <span className={c.str}>&quot;{s}&quot;</span>
                        <span className={c.punc}>,</span>
                      </span>
                    </span>
                  ))
                )}
                {"\n"}
                {"  "}
                <span className={c.punc}>]</span>
                <span className={c.punc}>,</span>
                {"\n"}
                <span className={c.punc}>{"});"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
