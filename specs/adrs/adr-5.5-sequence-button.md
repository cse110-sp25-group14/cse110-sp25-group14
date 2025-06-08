| status   | date decided | decision-makers      | consulted | informed |
|----------|--------------|----------------------|-----------|----------|
| proposed | 2025-05-31   | Aarush, Gautam       | —         | —        |

# ADR – Replace Difficulty Dropdown with Clickable Button

## Context and Problem Statement
The sequence game screen currently uses a dropdown to select difficulty, which is hard to style, cluttered on mobile, and inconsistent with the planned minimalistic, centered UI. As of right now, clicking new values on the dropdown also does not give any insight to the users on what the difficulty does so the new option needs to re-generate the grid each time so users know what increasing difficulty does.

## Decision Drivers
* Mobile usability and visual simplicity.
* Consistent, streamlined look and feel.
* Add interesting functionality.

## Considered Options
1. **Dropdown** (current) – hard to style and use on mobile.
2. **Clickable button** – aligns with minimal UI, easier to use and style.

## Decision Outcome
**Chosen:** Replace the difficulty dropdown with a clickable (toggle) button. Each toggle will re-generate the grid to the difficulties grid size (Easy: 3x3, Medium: 4x4, Hard: 5x5).

## Consequences
* **Good** — Improved mobile usability, clean appearance.
* **Good** — Simplified CSS.
* **Bad** — Less flexible for adding many options in the future.
* **Bad** - Requires more JS in order to accomodate feature.
* **Bad** - more JS can be more demanding on the browser/network.

## Confirmation
This decision was made by Aarush and Gautam on 5/31/25. It has not been since finalized with the team and has been fully implemented and tested.