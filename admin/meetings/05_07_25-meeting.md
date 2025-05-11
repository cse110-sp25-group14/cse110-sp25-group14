# CSE 110 5/7 Meeting (7:00 pm)

## Attendance
Carl Casares, Aarush Mehrotra, Eric Wang, Kilhoon Kim, Srideep Dornala, Travis Huang, Emily Cai, Victoria Tran, Mark Escarrilla

---

## Goals/TODO

1. contract , each member answers each question - **GET DONE BY FRIDAY!!!**  
   [Figma link](https://www.figma.com/design/q9ToDytUmEwnqgxW3XrlxZ/MAIN-PROJECT?node-id=143-120&t=zIjRzmXGDkrw97Yk-1)  
   #6 is the file we work on together  

2. documentation with the 4 (minimum) ADR files for entire project - need 2 by this weekend and another 2 by May 25th  
   [ADR Template](https://github.com/adr/madr/blob/4.0.0/template/adr-template.md)  
   Explains big decision team has made and how we made those big decisions  
   Ex. how homepage looks and what games we decided  
   - ADR #1 - How Homepage was decided — Carl will write it  

3. CI/CD Meeting - **due Sunday**  
   - Complete pipeline for phase 1  
   - Each of us should take a look at how these submissions should look like  
   - Individually answer #1-#5 for Management assignment  
   - Decide a branching strategy  
   - Formalize roles  

---

## Meeting Notes

- Everyone makes own assignment #1 and we make a group upload  
- Add individual Management Assignment to github repo by **Friday** (due Saturday), everyone makes separate file  
- 4 minimum ADRs are for the entire duration of project  
- We have two at the moment:
  - Game decision  
  - MVP (how homepage looks)  
- Get done by **Saturday** (due Sunday)  

### Branching Strategy
- Eric suggests we do a branch per issue, we all agree on this  
- Delete branch once we fix the issue  
- Decide how we want to divide work then make the corresponding issues  

---

## CI/CD Pipeline

- Decide checks:
  - HTML validator  
  - CSS validator  
  - Javascript JSDOC checker  
- Need to make diagrams  
- Agree on common code style  

### Naming Conventions
- Name variables with **camelCase**  
- Name functions with **underscores**  
- Name files with **dashes**  
- Use **double quotes** for strings  
- Use **semicolons** in JavaScript  
- Indentation: use **Tab**, not 4 spaces  
- Comment **before** the thing you are commenting on (not in the middle)

#### HTML
- Make general comments by sections (include input type and outputs)

#### JavaScript
- Comment per function using **JSDocs**  
- Make descriptive comments if taking code online  
- Stick to **const** and **let** when declaring variables  

---

## Pull Requests and Merges

- Whenever pull requests are made, it is not possible to be the one to merge it — someone else must merge it  
- Only need one person to review it  
- Delete branch after it has been merged  

---

## Roles

- Specify what each person should be doing rather than have it being too general  
- Assign groups — does not have to be permanent  
- Subteams should document meetings and decisions  
- Have a representative of each group to discuss the workflow, like a spokesperson  

### 1st sprint:
- A week to ten days  
