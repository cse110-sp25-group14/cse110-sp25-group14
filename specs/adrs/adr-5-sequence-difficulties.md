| status   | date decided | decision-makers                                                          | consulted                                                         | informed                        |
|----------|--------------|--------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------|
| accepted | 2025-05-25   | Aarush, Gautam, Victoria, Emily, Carl, Srideep, Eric, Mark, Kilhoon | Travis, Nilay | All team members via meetings |

# ADR – Difficulty System and Grid Display for Sequence Game

## Context and Problem Statement
The Sequence game initially had a static difficulty, making gameplay repetitive and non-scalable. We wanted to introduce **difficulty levels** (Easy, Medium, Hard) that not only changed the number of tiles to remember, but also visibly altered the size of the grid to reflect challenge level. 

## Decision Drivers
* Improve replay value and user engagement by offering multiple challenge levels.  
* Provide visual clarity for how difficulty impacts gameplay.  
* Maintain consistent behavior across sessions using `localStorage`.

## Considered Options
1. **Add difficulty dropdown** that dynamically adjust the grid and are saved to `localStorage`.  
2. Set difficulty behind-the-scenes, only affecting logic (not visual grid).  
3. Fixed single difficulty mode.  
4. Let players type in difficulty as a manual input field.

## Decision Outcome
**Chosen:** Add difficulty dropdown (Easy, Medium, Hard). Each difficulty corresponds to a different sequence length and dynamically updates the grid shown to the user. This state is stored in `localStorage` and persists across sessions.

## Consequences  
* **Good** — Easier testing and debugging with visual grid tied to logic.  
* **Bad** — Requires extra DOM updates and animation syncing for each grid variation.
* **Bad** - can't style the dropdown that well.

## Implementation Notes
* On difficulty dropdown select, the grid is rebuilt to match the selected difficulty (e.g., Easy = 3x3, Hard = 5x5).  
* The selected difficulty and current level are saved in `localStorage` as part of the `sequence-recent` object.  
* A default grid is shown on load before a difficulty is selected to avoid blank states.  
* Difficulty dropdown are styled consistently and attached to event listeners during DOMContentLoaded.

## Confirmation
This decision was confirmed and approved by team leaders Aarush and Gautam after discussion with the entire team. Grid generation tied to difficulty is live in the Sequence game as of sprint 2.