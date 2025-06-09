| status | date | decision-makers | consulted | informed |
| --- | --- | --- | --- | --- |
| accepted | 2025-05-18 when the decision was first proposed, 2025-06-07 when the decision was last updated | Victoria, Emily, Carl | Aarush, Gautam, Mark, Eric, Travis, Nilay, Srideep, Kilhoon | Aarush, Gautam, Mark, Eric, Travis, Nilay, Srideep, Kilhoon |

# Adding a dark mode to the game, triggered through a toggle 

## Context and Problem Statement

After reviewing industry trends and competitor features, we realized that many games had a dark mode option to enhance gameplay experience. We also considered the benefits of providing users with more control over their game experience.

## Decision Drivers

* Matching market trends and competitor features
* Enhancing gameplay experience through visual enhancements
* Providing users with more control over their game settings

## Considered Options

* Do not add a dark mode toggle
* Leave the game with its current default theme

## Decision Outcome

Chosen option: We decided to add a dark mode toggle, which was implemented through a UI toggle.

## Decision Details

The dark mode toggle is available to users and can be enabled/disabled as desired. The toggle was implemented using a simple true/false value to control the game's theme, which simplifies our codebase and speeds up development. The dark mode features include:

* Changing the background color to a darker shade
* Changing the card images to a darker one, with increased contrast and visibility
* Adjusting text colors to white or light colors to ensure readability

The dark mode color scheme underwent several iterations based on user feedback, with the initial design looking like an underwater environment. After revision, the new color scheme features a more modern and aesthetically pleasing design.

## Consequences

* Good, because it enhances the gameplay experience for users
* Bad, because it may require additional maintenance and testing

## Confirmation

This decision was confirmed through:

* Review of industry trends and competitor features
* Feedback from the development team and users
* Implementation of a simple yet effective dark mode toggle

## Pros and Cons of the Other Theme Options

### Light or Color-Coded Theme

A light or color-coded theme could enhance the game experience, but it may not have been as engaging as the dark mode toggle.

### No Theme or Default Theme

Leaving the game with its default theme may not have provided users with enough control over their experience.

### No Iterations of Dark Mode Color Scheme

Failing to iterate on the dark mode color scheme may have resulted in a suboptimal user experience, as evidenced by the initial design of the dark mode implementation looking underwater-like.
