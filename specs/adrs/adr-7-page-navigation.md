| status   | date decided | decision-makers                                                          | consulted                                                         | informed                        |
|----------|--------------|--------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------|
| accepted | 2025-05-18   | Aarush, Gautam, Victoria, Emily, Carl, Srideep, Eric, Mark, Kilhoon | Travis, Nilay | All team members via meetings |

# ADR – Homepage Structure and Page Navigation

## Context and Problem Statement
Our app includes multiple mini-games (like Sequence and Matching), each hosted on its own page. We needed a navigation model that allows users to easily move between games and return to a central hub without breaking the experience. It should be intuitive while still maintaining our overall goal of minimalism.

## Decision Drivers
* Simplicity for users to move between games.  
* Scalability for adding new games in future sprints.  
* Consistent UI and back button behavior across all game pages.

## Considered Options
1. **Single homepage with links to each game page**, and a back button on each game.  

## Decision Outcome
**Chosen:** Use a **single homepage** that links to separate HTML files for each game. Each game page includes a **back button** (linked to homepage) for consistent user experience. Each page should maintain selected visual mode preference made (Dark mode or Default). Results page will have back arrow as well that takes users back to homepage and a play again button which takes them back to the game.

## Consequences
* **Good** — Navigation is intuitive and easy to maintain.  
* **Good** — Easy to add more games by linking new pages.  
* **Bad** — No fancy transitions.

## Implementation Notes
* Each game page uses a shared layout at the top with a back arrow `<img>` that routes to `/source/homepage.html`.  
* LocalStorage is used to persist game state so progress is not lost during navigation.  
* All links use relative paths and follow consistent naming (`sequence.html`, `matching.html`, etc.) to reduce confusion during development.

## Confirmation
This decision was confirmed and approved by team leaders Aarush and Gautam after consultation and agreement among all team members. The implementation was finalized and tested in sprint 4.