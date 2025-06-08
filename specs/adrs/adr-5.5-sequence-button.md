| status   | date decided | decision-makers      | consulted | informed |
|----------|--------------|----------------------|-----------|----------|
| proposed | 2025-05-31   | Aarush, Gautam       | —         | —        |

# ADR – Replace Difficulty Dropdown with Clickable Button

## Context and Problem Statement
The sequence game screen currently uses a dropdown to select difficulty, which is hard to style, cluttered on mobile, and inconsistent with the planned minimalistic, centered UI.

## Decision Drivers
* Mobile usability and visual simplicity.
* Consistent, streamlined look and feel.
* Easier implementation and maintenance.

## Considered Options
1. **Dropdown** (current) – hard to style and use on mobile.
2. **Clickable button** – aligns with minimal UI, easier to use and style.

## Decision Outcome
**Chosen:** Replace the difficulty dropdown with a clickable button.

## Consequences
* **Good** — Improved mobile usability, clean appearance.
* **Good** — Simplified CSS and event handling.
* **Bad** — Less flexible for adding many options in the future.

## Confirmation
This decision was made by Aarush and Gautam on 5/31/25. It has not been finalized by the team but is proposed for immediate implementation.
