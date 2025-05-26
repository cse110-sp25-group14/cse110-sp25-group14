# 051825-retrospective.md

## Agile Retrospective Review Meeting
**Date:** May 18, 2025  
**Time:** 10:30 AM - 11:00 AM  
**Attendance:** Gautam Mohandas, Aarush Mehrotra, Carl Casares, Victoria Tran, Emily Cai, Kilhoon Kim, Srideep Dornala, Mark Escarrilla, Travis Huang, Eric Wang

---

## High Points (What Went Well)
- Aarush appreciated the productive kick-off meeting for the sprint.
- Clear and transparent discussions about concerns and successes.
- Productive sprint despite its short duration.
- Significant progress on linters, homepage, and games' front-end development.
- Team health is looking really good- more members are actively participating and more ideas are being discussed in all meetings. 

---

## Retrospective Insights and Suggestions for Improvement
### General
#### Concerns
- **Sprint Planning:** Plan future sprints in greater detail. Sprints should have a priority-type scaffolding of tasks across teams. We should prioritize tasks instead of operating on a first-come first-serve basis, which may not be an efficient use of time. Less important tasks can be considered if time remains in the sprint after the primary task is completed. 
- **Task Completion:** If tasks are finished early, members should proactively come up with new ideas. Alternatively, members of the team done early can consider helping out in other teams (raising bus factor of our team)
- **Goals:** Clearly differentiate priority goals from stretch goals. (see above)
- **Communication:** When updates that affect the whole project, such as updates to the CI/CD pipeline, there should be team-wide announcements so that everyone is on the same page. This prevents confusion about versions, bugs, etc. within teams. There was discussion about the `announcements` channel on Slack, which was set up to allow @everyone pings to everyone on the team without bothering the TA. 

### Backend Improvements
- Add achievement functionality and integrate local storage.
- Enhance scalability and compatibility across mobile and laptop platforms.
- Explore potential dynamic difficulty adjustments:
  - Eric: Suggest timer decrements as difficulty increases.
  - Victoria: Suggest implementing difficulty toggles for sequence games.

### Github Repo & Pipeline
- Communicate clearly and promptly with the team whenever changes are made to linter configurations or pipeline validations. This helps team members stay updated and synchronize code efficiently.

### Frontend Enhancements
#### Homepage
- Evaluate dark mode designs:
  - Green/blue versions tested.
  - Green banner ("Underwater kelp forest") noted as too dark; possibly revert to grey theme.
  
#### Games (Matching & Sequence)
- Address hard-coded elements within the games for increased flexibility and scalability.

---

## Artifacts and Follow-up Actions for Next Sprint
- Create clear documentation of final dark mode and general theme implementation decisions.
- Record finalized difficulty scaling and achievement system designs.
- Track progress on linter/pipeline improvements explicitly through GitHub issues.

> Note: Artifacts from this retrospective should be included in sprint planning sessions and status videos.
