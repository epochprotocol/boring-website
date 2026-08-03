"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
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
    label: "Move across chains",
    desc: "Route value between any supported networks.",
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
    label: "Compliance checks",
    desc: "KYC, sanctions and policy screening.",
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
    label: "Multi-step flows",
    desc: "Chain actions into one atomic outcome.",
    icon: "layers",
    step: "compose",
  },
  {
    id: "settle",
    label: "Settle & confirm",
    desc: "Verified result reported to your systems.",
    icon: "boxCheck",
    step: "settle",
  },
];

const c = {
  kw: "text-glow",
  fn: "text-accent-strong",
  str: "text-[color:var(--color-teal)]",
  com: "text-muted",
  punc: "text-ink-soft",
};

export function Capabilities() {
  const [selected, setSelected] = useState<string[]>([
    "bridge",
    "swap",
    "compliance",
  ]);

  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const steps = CAPABILITIES.filter((cap) => selected.includes(cap.id)).map(
    (cap) => cap.step
  );

  return (
    <section
      id="capabilities"
      className="section border-b border-line bg-surface-2"
    >
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Compose"
          title="Choose your capabilities. Epoch composes the outcome."
          lead="Toggle what your flow needs. It all runs through one API surface — no extra services to assemble or maintain."
        />

        <Reveal className="panel section-body grid gap-0 overflow-hidden lg:grid-cols-[1.1fr_1fr]">
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
                        className="h-2.5 w-2.5"
                      >
                        <path d="M2.5 6.5l2.5 2.5 4.5-5" />
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
              See the full API reference
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
                      <span className={c.str}>&quot;{s}&quot;</span>
                      <span className={c.punc}>,</span>
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
        </Reveal>
      </div>
    </section>
  );
}
