| status   | date decided | decision-makers                                                          | consulted                                                         | informed                        |
|----------|--------------|--------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------|
| accepted | 2025-06-01   | Aarush, Gautam, Victoria, Emily, Carl, Srideep, Eric, Mark, Kilhoon | Travis, Nilay | All team members via meetings |

# ADR – Records and Results Pages for Progress Tracking and Post-Game Feedback

## Context and Problem Statement
To improve player motivation and reinforce progress, we needed a clear way to:
1. Show **recent performance immediately after a game** (Results page), and  
2. Provide a centralized view of **historical performance** across all sessions (Records page).

Both pages depend on `localStorage` to store and retrieve progress and difficulty data.

## Decision Drivers
* Encourage continued gameplay by showing improvement.  
* Let users compare performance across different difficulty levels.  
* Reuse saved data already written during gameplay sessions.  
* Keep the experience consistent across all games.

## Considered Options
1. Create **dedicated `results-matching.html` and `results-sequence.html` and `records.html` pages**, each with a different role.  
2. Merge results into each game’s end screen and drop the records page.  
3. Use only alert boxes or modals for quick feedback, with no persistent record.  
4. Do not track user performance at all.

## Decision Outcome
**Chosen:** Implement both a `results.html` page for each game (for current session stats) and a `records.html` page (for long-term tracking across difficulties and sessions).

- The **Results page** is loaded after a game ends and shows the player’s most recent level and record.
- The **Records page** shows the player’s best scores per difficulty, based on saved data in `localStorage`.

## Consequences
* **Good** — Improves user feedback loop and gives players goals to beat.  
* **Good** — Each page has a focused purpose and clean layout.  
* **Bad** — Requires consistent `localStorage` structure across games and version-safe data formats.

## Implementation Notes
* The `sequence-recent` object in `localStorage` stores the most recent level and difficulty.
* The `sequence` array stores each game run, with difficulty and level reached.
* The Results page reads `sequence-recent` to display current stats after gameplay.
* The Records page aggregates the highest level for each difficulty.
* Both pages include a back button to return to the homepage and a `<noscript>` warning for JS-disabled environments.
* Data formatting and UI rendering is handled on DOMContentLoaded using plain JavaScript.
* Steps repeated for matching game as well.
* Records implements sorting logic as well as sorting by time or moves.

## Confirmation
This decision was confirmed and approved by team leaders Aarush and Gautam after group consensus. The two pages were implemented and found to be buggy during sprint 4 and are actively being fixed for final implementation.