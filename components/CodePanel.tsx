// A small, editor-style panel showing the Epoch API defining an outcome.
// Purely presentational — inspired by Stripe/Link's use of real code to
// signal that this is a credible, developer-grade product.

const c = {
  kw: "text-accent-strong",
  fn: "text-accent-strong",
  str: "text-[color:var(--color-teal)]",
  com: "text-muted",
  punc: "text-ink-soft",
};

export function CodePanel({ className = "" }: { className?: string }) {
  return (
    <div className={`panel overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="label">outcome.ts</span>
        <span className="label">Example</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          <span className={c.kw}>import</span>{" "}
          <span className={c.punc}>{"{ Epoch }"}</span>{" "}
          <span className={c.kw}>from</span>{" "}
          <span className={c.str}>&quot;@epoch/sdk&quot;</span>
          <span className={c.punc}>;</span>
          {"\n\n"}
          <span className={c.kw}>const</span>{" "}
          <span className={c.punc}>epoch</span> ={" "}
          <span className={c.kw}>new</span>{" "}
          <span className={c.fn}>Epoch</span>
          <span className={c.punc}>{"({ apiKey });"}</span>
          {"\n\n"}
          <span className={c.com}>{"// Define the outcome — Epoch handles the rest"}</span>
          {"\n"}
          <span className={c.kw}>const</span>{" "}
          <span className={c.punc}>result</span> ={" "}
          <span className={c.kw}>await</span>{" "}
          <span className={c.punc}>epoch</span>.
          <span className={c.fn}>solve</span>
          <span className={c.punc}>({"{"}</span>
          {"\n"}
          {"  "}outcome<span className={c.punc}>:</span>{" "}
          <span className={c.str}>&quot;acquire&quot;</span>
          <span className={c.punc}>,</span>
          {"\n"}
          {"  "}asset<span className={c.punc}>:</span>{" "}
          <span className={c.str}>&quot;USDC&quot;</span>
          <span className={c.punc}>,</span>{" "}
          amount<span className={c.punc}>:</span>{" "}
          <span className={c.str}>&quot;250000&quot;</span>
          <span className={c.punc}>,</span>
          {"\n"}
          {"  "}chain<span className={c.punc}>:</span>{" "}
          <span className={c.str}>&quot;base&quot;</span>
          <span className={c.punc}>,</span>{" "}
          from<span className={c.punc}>:</span>{" "}
          <span className={c.str}>&quot;any&quot;</span>
          <span className={c.punc}>,</span>{" "}
          <span className={c.com}>{"// any chain, token, or fiat"}</span>
          {"\n"}
          {"  "}compliance<span className={c.punc}>:</span>{" "}
          <span className={c.punc}>[</span>
          <span className={c.str}>&quot;kyc&quot;</span>
          <span className={c.punc}>,</span>{" "}
          <span className={c.str}>&quot;sanctions&quot;</span>
          <span className={c.punc}>],</span>
          {"\n"}
          <span className={c.punc}>{"});"}</span>
        </code>
      </pre>
    </div>
  );
}
