# 052525-retrospective.md

## Agile Retrospective Review Meeting
**Date:** May 25, 2025  
**Time:** 12:30 PM – 1:00 PM  
**Attendance:** Gautam Mohandas, Aarush Mehrotra, Carl Casares, Victoria Tran, Emily Cai, Kilhoon Kim, Srideep Dornala, Mark Escarrilla, Travis Huang, Eric Wang, Nilay Bhoot

---

## High Points (What Went Well)
- Team continued to ship features and collaborate across front-end and back-end areas.  
- Strong individual ownership: everyone could point to concrete contributions from the sprint.  
- Meeting transparency: members openly shared pain points and suggestions for smoother work next sprint.
- Team Health is continuing at an all-time high and collaboration between groups is becoming stronger.  

---

## Retrospective Insights and Suggestions for Improvement

### Team-wide
- **Issue assignment:** Ensure every task has an assignee (person / pair / sub-team) before work begins.  
- **Code reviews:** Increase emphasis on reviews so the whole team understands the codebase (crucial for the final interview).  
- **Weekly code-review meeting:** Schedule a recurring all-hands walkthrough of recent merges.  
- **Repository housekeeping:** Reorganize files in the root directory for clearer separation of concerns.

### Backend
| Contributor | Reflection / Improvement Goal |
|-------------|------------------------------|
| **Gautam** | Was sick but able to still help the team coordinate meetings and the sprint but wishes was more involved code-wise. Wants to be more on top of generating ADRs so that documentation of process is clearer. |
| **Aarush** | Wants to attend more sub-meetings and pair-programming sessions; struggles with late-night syncs—morning check-ins might help. |
| **Eric** | Aims to work more closely with other teammates. |
| **Mark** | Clarify guidelines on when to open an issue—rule of thumb: **any change warrants an issue, then assign it**. |
| **Srideep** | Start tasks earlier to avoid last-minute crunch. |
| **Kilhoon** | Make more time for the project and *always* create & self-assign an issue before coding; requests brief JSDoc descriptions for every function to improve automated docs. |

### Frontend
| Contributor | Reflection / Improvement Goal |
|-------------|------------------------------|
| **Carl** | Communicate sooner with both front- and back-end teams about required icon formats (PNG vs SVG); iterate on Figma designs earlier. |
| **Victoria** | Begin responsiveness work earlier so matching & sequence pages share consistent breakpoints; pair programming with Emily was helpful. |
| **Emily** | Wishes initial Figma redesign happened earlier to avoid late design churn; codebase could be cleaner to prevent responsiveness regressions between pages. |
| **Travis** | Needs more time to apply holistic design improvements across the site; plans to implement outstanding tweaks before project end. |
| **Nilay** | Hopes to contribute further to homepage redesign for better responsiveness and latency; also wants to support back-end tasks. |

---

## Action Items for Next Sprint
1. **Create & assign issues for all changes**—no untracked work.  
2. **Stand-up code-review session** once per week (entire team).  
3. **Root-directory re-org**: propose and merge a clearer folder structure.  
4. **JSDoc enforcement**: every JS function gets a brief description (build hooks will fail otherwise).  
5. **Icon-format decision**: finalize PNG vs SVG and communicate in `announcements` Slack channel.  
6. **Early responsiveness & design freeze**: lock key breakpoints and Figma designs by mid-sprint to reduce late rework.  
7. **Morning slack check-ins** (optional) to accommodate varying schedules and keep glue members in the loop.
8. **Code the records and results page skeleton**: Backend team can then go in and start implementing localStorage features.

