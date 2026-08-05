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

type FieldName = "name" | "company" | "email" | "useCase";

type FieldErrors = Partial<Record<FieldName, string>>;

// The email check is deliberately loose: it exists to catch typos like a
// missing domain, not to enforce RFC 5322. Over-strict patterns reject real
// institutional addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name so we know who to reply to.";
  if (!values.company.trim())
    errors.company = "Enter your company or organisation.";
  if (!values.email.trim()) {
    errors.email = "Enter a work email so we can respond.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email does not look complete. Check the domain part.";
  }
  if (!values.useCase) errors.useCase = "Select the option closest to your team.";
  return errors;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values: Record<FieldName, string> = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      useCase: String(data.get("useCase") || ""),
    };
    const message = String(data.get("message") || "");

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      const firstInvalid = (["name", "company", "email", "useCase"] as FieldName[]).find(
        (f) => fieldErrors[f]
      );
      if (firstInvalid) {
        const el = form.elements.namedItem(firstInvalid);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    const subject = encodeURIComponent(`Epoch inquiry: ${values.company || values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nUse case: ${values.useCase}\n\n${message}`
    );
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
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

  const field = (hasError: boolean) =>
    `mt-2 w-full rounded-[var(--radius-control)] border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent ${
      hasError ? "border-danger" : "border-line-strong"
    }`;
  // Field labels take the monospace register with the rest of the structural
  // text, so the form reads as part of the same document as the datasheets.
  const label = "label";

  const errorText = (id: FieldName) =>
    errors[id] ? (
      <p id={`${id}-error`} className="mt-1.5 text-xs text-danger" role="alert">
        {errors[id]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="panel p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
            className={field(!!errors.name)}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Company
          </label>
          <input
            id="company"
            name="company"
            required
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            onChange={() => clearError("company")}
            className={field(!!errors.company)}
          />
          {errorText("company")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={() => clearError("email")}
          className={field(!!errors.email)}
        />
        {errorText("email")}
      </div>

      <div className="mt-5">
        <label htmlFor="useCase" className={label}>
          What best describes you
        </label>
        <select
          id="useCase"
          name="useCase"
          required
          aria-invalid={!!errors.useCase}
          aria-describedby={errors.useCase ? "useCase-error" : undefined}
          onChange={() => clearError("useCase")}
          className={field(!!errors.useCase)}
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          {useCases.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        {errorText("useCase")}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          What outcome are you trying to achieve?
        </label>
        <textarea id="message" name="message" rows={4} className={field(false)} />
      </div>

      <button type="submit" className="btn btn-lg btn-primary mt-7">
        Send inquiry
      </button>
    </form>
  );
}
