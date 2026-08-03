"use client";

import { useState } from "react";
import { SALES_EMAIL } from "@/lib/site";

const useCases = [
  "Hedge fund / institution",
  "Bank / payments",
  "Fintech / neobank",
  "Product / platform team",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const email = String(data.get("email") || "");
    const useCase = String(data.get("useCase") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Epoch inquiry — ${company || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nUse case: ${useCase}\n\n${message}`
    );
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="panel p-8">
        <h3 className="display t-h3 text-ink">Thank you</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your email client should have opened with your message ready to send.
          If it did not, reach us directly at{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="link">
            {SALES_EMAIL}
          </a>
          . We will follow up shortly.
        </p>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-[var(--radius-control)] border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent";
  // Field labels take the monospace register with the rest of the structural
  // text, so the form reads as part of the same document as the datasheets.
  const label = "label";

  return (
    <form
      onSubmit={handleSubmit}
      className="panel p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Company
          </label>
          <input id="company" name="company" required className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>
          Work email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>

      <div className="mt-5">
        <label htmlFor="useCase" className={label}>
          What best describes you
        </label>
        <select id="useCase" name="useCase" className={field} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {useCases.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          What outcome are you trying to achieve?
        </label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>

      <button
        type="submit"
        className="btn btn-lg btn-primary mt-7"
      >
        Send inquiry
      </button>
    </form>
  );
}
