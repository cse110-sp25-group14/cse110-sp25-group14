| status   | date decided | decision-makers                                                          | consulted                                                         | informed                        |
|----------|--------------|--------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------|
| accepted | 2025-05-25   | Aarush, Gautam, Victoria, Emily, Carl, Srideep, Eric, Mark | Travis, Nilay, Kilhoon| All team members via meetings |

# ADR – Unified Linting Standard (ESLint + Stylelint + HTMLHint)

## Context and Problem Statement
Our codebase spans HTML, CSS / SCSS, and JavaScript. A single automated linting workflow is needed to catch errors early, enforce style consistency, and keep PR reviews focused on logic rather than formatting.

## Decision Drivers
* Developer experience and time-savings in reviews.  
* Mature CLI support for local dev and GitHub Actions.  
* Fine-grained configurability so the team can relax rules that block velocity.  

## Considered Options
1. **ESLint only** with HTML/CSS plugins.  
2. **Prettier only** for formatting, custom scripts for semantic checks.  
3. **ESLint + Stylelint + HTMLHint** (one purpose-built linter per file type).  
4. **No automated linters** — rely on reviewers and IDE warnings.

## Decision Outcome
**Chosen:** **ESLint** for JavaScript, **Stylelint** for CSS, **HTMLHint** for HTML.

## Consequences
* **Good** — Consistent style and fewer nit-pick PR comments.  
* **Good** — Early detection of accessibility issues (HTMLHint) and invalid CSS (Stylelint).  
* **Bad** — Slight learning curve and sort of long test CI time.

## Implementation Notes
* **Stylelint** uses `stylelint-config-standard`; this preset already includes all custom rules the team wanted, so no overrides are necessary.  
* **HTMLHint** is configured with a minimal `.htmlhintrc`; only the rules the team explicitly wants (e.g., `doctype-first`, `alt-require`, `attr-value-double-quotes`) are enabled.  
* **ESLint** extends the official `@eslint/js` recommended set and adds stylistic rules via `@stylistic/eslint-plugin`:

## Confirmation
This decision was confirmed and approved by team leaders Aarush and Gautam after consultation and agreement among all team members. The implementation has already been successfully completed as of 5/25/25.
