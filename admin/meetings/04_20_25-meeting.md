# CSE 110 4/20/25 WARM-UP MEETING

## Present Members
Gautam Mohandas, Aarush Mehrotra, Victoria Tran, Emily Cai, Carl Casares, Mark Escarrilla, Travis Huang

---

## GOALS

- SWOT (strength, weakness, opportunity, threat) analysis

### Structure of Video
- After your mini-sprint, you demonstrate your component(s) or app in a short video uploaded on YouTube (under 3 minutes)  
- Start thread for what should be in the video  
- Record video  

---

## MEETING NOTES

**TODO:**
- Documentation  
- SWOT analysis  
- Video  
- Will try to get video done earlier  
- Will try to contact TA to have him run through  

---

## SWOT Analysis

### Strengths
- Working MVP was made really quickly, easy to build on that after  
- Roles figured out earlier on  
- Assignment finished in a short amount of time  
- How quickly UI/UX team agreed on decisions and designs  
- Frontend and backend synergy was amazing  
- Once we get rolling, we don’t slow down  
- Productive team  
- Most people communicate well  
- Seeing people step up other than our amazing leaders  
- Self-sufficient group  
- Custom logo  
- Custom back of cards  
- Passion of members  

### Weaknesses
- GitHub & GitHub structure  
- Make easier, more clear structure from the get-go  
- Go through new assignment ASAP  
- Assign responsibilities on the day of - gives extra day or two to work on things and allows us to work together sooner  
- Communication  
- Certain members did not communicate  

### Opportunities
- Subgroup of members who are very interested in this project!  
- Opportunity for elevated final project  
- Skilled front-end team - stronger branding route  
- Symbols, branding, logo  

### Threats
- Possibility of more productive workers getting burnt out or sick - bus factor  
- Not equal contributions - some members did not contribute as much as we wanted them to  
- This is also a low bus factor related problem - what if the group of people who are more productive have to prioritize a different class, get sick, etc. - could be a problem down the quarter  

---

## Group 14: SWOT Analysis of Warmup Exercise

### Introduction

#### Strengths
One of the biggest strengths of our team is that most people on the team communicate and work well together. Despite a slightly late start to the assignment as we were figuring things out, we were then able to complete steps 1 and 2 of the assignment in a very short amount of time. The communication, trust, and accountability between most team members allowed us to build an initial working product quickly. We believe this was helped by allowing people to self-select their roles based on interest and skill. After that, we were able to work on various front end and back end improvements, merge branches and pull requests, and test and provide feedback to each other. This was partially aided by another strength, which is how quickly sub teams were able to agree on decisions and directions. By having various team members step up beyond just our leaders, we showed that we are a self-sufficient, capable, and productive group overall. We also have a good teamwork model in terms of allocating tasks. Our teamwork breakdown involves sub groups where each team member helps keep another accountable, creating an efficient divide and conquer strategy that allows us to cover more ground without overconsolidation into one facet of the assignment. In addition, instead of going solo, working in these subgroups allows a better workflow as we can keep each other accountable and look for each other’s mistakes on the spot without overcommitting our resources to one specific part of the project.

#### Weaknesses
A key area for improvement within our team is managing our GitHub repository and establishing a clearer structure from the start. There was initial confusion regarding our GitHub workflow, which sometimes slowed down progress. Additionally, we recognized that reviewing and assigning responsibilities for new assignments earlier could significantly benefit the team's productivity. Delaying this step occasionally meant losing valuable days for collaboration. Finally, although most team members communicated well, there is still room for improvement, and we faced some uncertainty in our workflow from members who did not communicate, or did not communicate effectively, with the rest of the team. Our organization could use a little improvement as we can allocate tasks, but our task allocation is somewhat uneven at the moment, in part due to the lack of initial communication from a couple members. Our meeting times are a little inconsistent, so we should work on rallying 90-100% of the group on to certain meetings, so that everyone is on the same page, whereas as of now we have delayed/incomplete communication of information.

#### Opportunities
We have several exciting opportunities for the future, driven primarily by the passion and enthusiasm shown by a subgroup of members deeply interested in this project. This provides a chance for us to produce an elevated final project with stronger branding and other elements. For example, there is room to develop custom logos, symbols, and other design aspects through our future card website, giving it a unique identity. We also believe that our team’s excitement, skill, and passion will inspire higher levels of overall quality across all aspects of the product in our future deliverables. With our team’s diverse capabilities and different experiences with software development, ranging from experience with full stack development, ui/ux, backend, etc. we have the potential to divide and conquer tasks really well
#### Threats
One of the most significant threats facing our team is the risk associated with the uneven distribution of workload, leading to the possibility of burnout, and exposing us to risk of illness or other priorities among our most productive members. If key contributors become overwhelmed, sick, or need to prioritize responsibilities from other classes, our progress could suffer considerably. For example, if that had happened during this project, there might have been bugs in the backend that the rest of us wouldn’t know how to fix, enhancements to the UI/UX that wouldn’t have been made, or increased levels of inefficiency and technical debt in our codebase. This does indicate a high BUS factor as of now. In terms of meetings, finding consistent timing where everyone can discuss the task is a little bit of an issue right now and leads to a delay or incomplete knowledge of our progress for some teammates. We also believe that our team’s long-term success and cohesion depend heavily on consistent involvement from every team member. Addressing these issues proactively will be essential to ensure sustained productivity and project quality throughout the quarter.

---

## Video Script

### Introduction
- Introduce the “G14 card web app”

### Step 1:
- Show shuffle animation  
- Discuss card designs  
- Iteration and learning through initial layout/mockup, developments, and now the final version is visible here  
- Hand-designed title and has our group number  
- Color scheme: buttons go with the color scheme of the cards and changes on hover  

### Step 2:
- Show shuffle, deal 1, deal 5  
- Show how shuffle is different every time  
- Deal 5 is able to handle overflow logic:
  - You cannot deal 1 and then deal 5 — a 6th card does not show up  
  - Deal 5 will always overwrite and start 5  
  - Same with deal 1 six times  
- After multiple deal 1’s, each individual card is able to be flipped without flipping other cards  
- Shuffle will automatically reset the dealt cards as well, allowing a true shuffle and removing edge cases  
- Show how cards and shuffled deck persist through a browser refresh or restart through the use of the `localStorage` API  
- Difficulties with initial implementation of localStorage — overcame with ✨teamwork✨ during mini sprint  
- Documentation, and later upgrade to Javadoc comments  
- This helps increase reproducibility and raises our bus factor  