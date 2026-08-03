# Epoch design language — "Ledger"

The reference for anyone adding to this site. Everything here is implemented in
`app/globals.css`; components should compose these primitives rather than
inventing one-off styles.

## The idea

The previous language was borrowed from consumer fintech: 26px radii, gradient
headlines, glowing hover lifts, wide airy sections. That language works for a
product someone signs up for in ninety seconds. It works against a product a
bank's risk committee has to approve.

This one is built from the vocabulary of financial instruments — hairline
rules, a visible grid, monospace for anything structural or numeric, flat
surfaces, near-zero decoration. The tech-company energy comes from precision
and density rather than colour and motion. The target reference points are
API documentation and a term sheet, not a landing page.

## Five rules

1. **Elevation does not exist.** No shadows anywhere. Hierarchy comes from
   rules and surface tone.
2. **One accent.** Blue means interactive or important. Teal means live.
   Nothing else carries colour. Lavender has been removed — blue/purple
   gradients are the strongest visual tell of consumer crypto.
3. **Monospace carries structure**; sans carries prose. Labels, indices,
   metadata and figures are mono. Never the reverse.
4. **Radii are small and uniform** (6px). Nothing is a pill except live
   status dots.
5. **Motion is confirmation, not performance.** Under 250ms, no transform
   over 8px, nothing moves on hover.

## Tokens

Defined in `@theme` in `app/globals.css`, so every token is also a Tailwind
utility (`--color-ink` → `text-ink`, `bg-ink`, `border-ink`).

| Group | Tokens |
| --- | --- |
| Surface | `canvas` (page), `surface` (panels), `surface-2` (alternate bands) |
| Text | `ink`, `ink-soft` (body), `muted` (metadata) |
| Rules | `line` (hairline), `line-strong` (emphasis, controls) |
| Accent | `accent`, `accent-strong`, `accent-soft` (wash), `on-accent` |
| State | `teal` (live only), `positive` |
| Geometry | `--radius-card` / `--radius-tile` / `--radius-control` |
| Rhythm | `--spacing-section` (7rem) |

Three themes — light (default), `.dark`, `.mix` (dusk slate) — all redefine the
same token names, so no component needs theme-aware logic. `.on-dark` applies
the dark palette to a region inside a light page; `.on-dark-band` is a step
lighter, for a full-width dark band adjacent to another dark section.

## Type

| Class | Use |
| --- | --- |
| `.t-hero` | Page H1 only. Fluid 2.75–4.25rem. |
| `.t-h2` | Section headings. Fluid 1.875–2.625rem. |
| `.t-h3` | Card and panel headings. 1.125rem. |
| `.t-lead` | Section lead paragraph. 1.0625rem. |
| `.t-body` | Body copy inside cards and lists. 0.9375rem. |
| `.label` | Mono uppercase metadata. The workhorse. |
| `.eyebrow` | `.label` preceded by a short accent rule. |
| `.section-index` | The `§ 03` marker. |

Pair `.display` with a heading class for the display face and tracking.
Numerals are tabular everywhere they appear.

## Craft details

The things that separate a system that is correct from one that feels
finished. Most are invisible until absent.

- **Optical tracking.** Tracking tightens as size grows (`-0.034em` at hero,
  `-0.003em` at body); line-height moves the opposite way. Letterfit that
  reads correct at 16px looks loose at 68px.
- **Balanced headings.** `text-wrap: balance` on h1–h4, `pretty` on
  paragraphs — no stranded last words, no orphans.
- **Fluid rhythm.** Section padding, gutters and split-column padding all use
  `clamp()`. A flat 7rem is right at 1440px and absurd at 375px, which is what
  makes otherwise-good sites feel unconsidered on a phone. `.section-body` is
  the standard gap between a section header and its content.
- **Hairlines stay hairlines.** At `2dppx` and above, borders drop to 0.5px so
  they render as one device pixel rather than blurring across two.
- **Dark-mode inset highlight.** Panels on dark surfaces carry a 1px inset
  white highlight at 4%, simulating the light a real material would catch.
  This is the difference between expensive dark UI and merely dark UI.
- **Press, don't scale.** Buttons translate 1px on `:active`. Scaling
  resamples text and looks soft mid-animation.
- **Scroll spy.** The nav tracks the section under the header and marks it
  with `aria-current` plus an underline that scales from its left origin.
- **Skip link.** Keyboard-only jump to `#main`, hidden until focused.
- **Focus rings** are the accent plus a soft knockout halo, legible on every
  surface tone.
- **Selection colour** is the accent at 22%, not the browser default blue.

## Primitives

**`.panel`** — flat surface, 1px border, 6px radius, no shadow. The default
container. Add `.panel-interactive` for a hover border shift.

**`.ledger-grid` / `.ledger-cell`** — a grid whose cells are separated by true
hairlines instead of gaps, so a group reads as one ruled table. Set the column
count on the grid; cells need no border of their own. This is the default for
any set of three or more sibling items.

```tsx
<div className="ledger-grid md:grid-cols-3">
  <div className="ledger-cell ledger-cell-interactive">…</div>
</div>
```

**`.spec-row` / `.spec-label` / `.spec-value`** — label/value datasheet rows.
The register for anything a risk or procurement reader needs to extract
quickly. See `components/Security.tsx`.

**`.btn` + `.btn-primary` / `.btn-secondary` + `.btn-sm` / `.btn-lg`** — the
only button styles. Primary is ink-filled and goes accent on hover, so the
accent stays reserved for what is genuinely interactive.

**`.chip`** — metadata chip. Deliberately plain: it should read as a fact
printed on the page, not a badge someone designed.

**`.tag`** — mono uppercase categorical label, rule-bound rather than filled.

**`.index-mark`** — bordered numeric marker for step and item numbers.

**`.link`** — inline prose link with a soft accent underline.

**`.arrow-link`** — standalone forward link. Pair with a `.btn-arrow` span;
the arrow nudges 2px on hover. This is the only decorative motion in the
system and it earns its place by signalling direction.

**`.icon-tile`** — 2rem hairline-bordered square holding a 1rem icon. A
supporting mark, not an illustration.

## Section pattern

Every section opens with `<SectionHeader>`: index, rule, eyebrow, heading,
optional lead. The running index (`§ 01` … `§ 09`) is what makes the page read
as a document rather than a scroll of marketing panels.

Indices are assigned in page order in each component. If you insert a section,
renumber the ones after it. `Proof` is deliberately unnumbered — it renders
conditionally, so a number there would leave a gap.

Sections alternate: full-width band → split section → full-width band. Split
sections put narrative on one side and evidence on the other.

## Content rules that are part of the design

These matter as much as the visual system, because the audience is
institutional:

- **Never render an unsubstantiated proof point.** Audits, certifications,
  investors, partners, team and status all come from `lib/site.ts` and render
  *nothing* when unset. An empty slot costs nothing; a claim that fails
  diligence costs the deal.
- **State the failure path**, not only the happy path. Nobody senior believes
  a distributed system that never fails.
- **Own your dependencies** rather than claiming you have none.
- **Prefer a number to an adjective.** "Eight networks in production" beats
  "every major chain".

## Adding something new

1. Can it be a `.panel` or a `.ledger-grid`? Use those.
2. Is the text structural or numeric? Mono, via `.label`.
3. Reaching for a shadow, a gradient, a pill, or a third colour? That is the
   signal to stop and re-read the five rules.
