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
  paragraphs — no stranded last words, no orphans. Masked headings are the one
  exception: they force `wrap`, because the splitter measures with balance off
  and leaving it on made every heading re-wrap the instant it was split.
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

**`<RuledList>` / `.ruled-row`** — the page's primary content geometry and the
default for any set of two or more sibling items: hairline-ruled rows with a
mono index, title and body. It replaced the card grids outright. A card grid
says "here are some features we thought of"; a ruled register says "here is
the record", which is the register a settlement product should speak in. It
also gives the motion layer something honest to animate — rows being written
rather than boxes fading up.

```tsx
<RuledList rows={rows} scene="security" className="section-body" />
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

**`.icon-tile`** — 2rem hairline-bordered square holding a 1rem icon. Reserved
for functional UI (the capability toggles). Decorative icons next to headings
have been removed: a shield glyph beside the word "screening" adds nothing the
reader did not already have.

## Section pattern

Every section opens with `<SectionHeader>`: index, rule, eyebrow, heading,
optional lead. The running index (`§ 01` … `§ 09`) is what makes the page read
as a document rather than a scroll of marketing panels.

Indices are assigned in page order in each component. If you insert a section,
renumber the ones after it. `Proof` is deliberately unnumbered — it renders
conditionally, so a number there would leave a gap.

Sections alternate: full-width band → split section → full-width band. Split
sections put narrative on one side and evidence on the other.

## Motion

All of it lives in `components/MotionLayer.tsx`, driven by data attributes on
otherwise static server components. One `gsap.context()`, one `matchMedia`,
one timeline per scene.

**The narrative.** The page is a ledger being written. Headings are typeset
line by line out of a mask; register rows have their clip opened downward and
their contents follow; the rails diagram draws value along six inbound paths
into one outcome as you scroll. Every reveal describes what the content *is*.
There is no generic fade-up anywhere, because a fade-up says nothing.

**The scenes.**

| Scene | Trigger | Motion |
| --- | --- | --- |
| Reading position | scrub `0.6` | the top accent bar fills as the document is read |
| Hero | on load, after fonts | rule draws, headline typeset per line, record prints, route marks resolve left to right |
| Sections | once, `top 78%` | rule, heading, figures out of masks, then rows written in sequence |
| Rails | scrub `0.8` | nodes appear, rails draw via `stroke-dashoffset`, a marker rides the outcome rail, outcome resolves |
| How it works | scrub `0.6` | progress rule fills, each step resolves to full contrast |

**Borrowed from Stripe, adapted to the avoid-list.** Stripe's signature moves
are a gradient hero, a bento grid, a customer-logo marquee and big stat
counters — all four are either banned by this system or would require data
Epoch does not have. What was worth taking is the *behaviour*:

- **The composer builds itself.** Arriving at §02, the request empties and
  re-adds each capability in order, matching control lighting as its step
  lands. Runs once, only in view, and abandons itself permanently the moment
  the reader touches a control — their intent outranks the demo.
- **One object changes state beside the narrative.** §04 pins the left column
  and advances the same outcome record the reader met in the hero through
  queued → routing → settled. Not three illustrations; one object, three
  states, cross-faded in a single grid cell so nothing reflows.
- **An auto-advancing accordion.** §08 opens one use case at a time with a
  dwell rule, on ruled rows rather than cards. Advances only while on screen,
  pauses on hover and focus, stops permanently on interaction, and is fully
  keyboard operable with arrow-key roving.
- **A ticker instead of a logo wall.** Stripe runs customer logos; Epoch runs
  the networks in production, which is the one thing it can stand behind. Two
  copies of the list translating -50% — seamless, measurement-free, and the
  duplicate is `aria-hidden` so the list is announced once.

**Interaction detail** (CSS, not GSAP — cheaper and it survives with JS off):
the primary button fills with accent as a wipe from the left rather than a
colour swap; the capability tick draws itself via `stroke-dashoffset` instead
of appearing, because a drawn check reads as confirmation and confirmation is
what the control reports. Both are disabled under `prefers-reduced-motion`.

**Reuse of geometry.** The hero record's route marks are the same chain marks,
in the same order, as the rails diagram further down the page — so the record
and the diagram are visibly describing one thing rather than two.

**Engineering rules.**

- Only `transform`, `opacity`, `clip-path` and `stroke-dashoffset` are
  animated — nothing that triggers layout.
- Scrubs stay in the 0.6–1.2 band. Easing is `power3.out` throughout: no
  bounce, spring, or overshoot.
- Timelines are built only after `document.fonts.ready`, so line splitting
  measures the real face rather than the fallback.
- Line splitting is hand-rolled in `lib/motion.ts`: it preserves authored
  `<br>`, disables `text-wrap: balance` so measured lines match rendered
  lines, joins masks with whitespace so copy-paste and assistive tech read
  correctly, and returns a restore function.
- Everything sits inside `gsap.matchMedia()`, whose cleanup both reverts the
  tweens and un-splits the headings, so breakpoint changes re-measure.
- The "How it works" pin is CSS `position: sticky`, not a GSAP pin. No
  pin-spacer, no added scroll distance, nothing that can desynchronise from
  the scrollbar. Desktop only.

**Reveals must finish before the reader arrives.**

The second thing that made this page look broken was timing, not hiding. Entry
timelines ran about 1.5 seconds starting at `top 78%`, so at any normal scroll
speed the reader caught them mid-flight — rows sliced open, headings half
risen. That does not read as animation, it reads as a page still painting.

The fixes, all in `lib/motion.ts`:

- **Durations roughly halved.** A section's entry now settles in ~0.85s.
- **Triggers start earlier** (`top 88%`), so the timeline has run before the
  content reaches the reading zone.
- **`fastScrollEnd: true`.** If the reader scrolls quickly past a trigger,
  ScrollTrigger completes that animation immediately rather than playing it
  out behind them. This is the single most important setting for making fast
  scrolling look intentional.
- **No cross-fades between text layers.** The step stage switches states
  discretely via `onUpdate`, because dissolving one panel of text into another
  is a double exposure — at every mid-point the reader sees two records
  ghosting through each other, which is exactly what "half rendered" looks
  like.
- **Nothing is dimmed below ~0.55 opacity.** Text at a third opacity does not
  read as "not yet reached"; it reads as text that failed to render.

**The page paints complete. This is the important rule.**

The first version of this system hid every row, lead and rule on the page in
CSS until GSAP ran. The result looked like a broken render: an empty skeleton
of rules and borders, held until the JS chunk and the full font set had both
landed. Do not reintroduce that.

The rule now:

- **CSS holds back the hero only** — its heading, rule and supporting items.
  Small, above the fold, revealed within a frame or two of mount.
- **Everything else is held back by GSAP**, immediately before its timeline,
  and only if it is still off screen. A section already visible at first paint
  is left exactly as it rendered and is not split or animated at all, because
  the reader has already seen it.
- **Masked headings are split only while invisible.** Splitting a visible
  heading makes it flash — paint, vanish, slide back in. The hero avoids this
  by being held at zero opacity until after its split.
- **Fonts are raced against a 400ms cap.** Waiting for `fonts.ready` is
  correct for measurement but must never hold the hero blank.
- **One hiding mechanism per element.** Clipping a row *and* fading its
  children doubled the time it spent invisible and read as a stutter.

**Accessibility, and why nothing can get stranded.**

Initial states are scoped to a `.motion` class that a blocking script in
`<head>` adds only when JavaScript runs *and* reduced motion is not requested.
So with JS off, with reduced motion on, or if the GSAP chunk fails, the page
renders complete. A 1.2s failsafe in the same script strips the class if
`MotionLayer` never claims ownership, and `MotionLayer` strips it itself if a
tween throws.

Reduced motion removes the sticky pin and every scrub along with the reveals.
Content, focus order and the skip link are identical in both modes.

## Reconciled with the live site

`epochprotocol.xyz` is the company's real site, and it carried product
substance this one had flattened away. What was pulled across:

- **Three integration surfaces** — Widget, Flows SDK, Intents SDK & API — now
  §06. "One API" undersold it badly: a drop-in widget, an SDK and a raw
  intents API are three different commitments of engineering time, and naming
  them is what lets a technical buyer size the work before booking a call.
- **Solver coordination** as the execution model, in the assurance sheet.
  Outcomes are filled by competing solvers, not a privileged executor — that
  is a real architectural answer to "who can move my money", and it was
  missing.
- **Mainnet status**, replacing the invented "built for production workloads"
  chip. It is running; say so.
- **The live application** (kismet.today). A product a reader can open beats
  any amount of trust copy.
- **Published writing** — four real posts, §11. Technical buyers read what a
  company has written before they read what it claims.
- **"Rails for modern finance"** as the positioning line. Better than anything
  invented here.
- **Corrected social links.** The X and Discord URLs on this site were guesses
  and both were wrong.

Not taken: the all-caps body copy. All-caps headings are defensible as a brand
tie, but all-caps paragraphs cost real reading speed, and this audience is
being asked to read carefully.

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

1. Can it be a `<RuledList>` or a `.panel`? Use those.
2. Is the text structural or numeric? Mono, via `.label`.
3. Reaching for a shadow, a gradient, a pill, or a third colour? That is the
   signal to stop and re-read the five rules.
