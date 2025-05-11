# CSE 110 5/10 Meeting (3:00 pm)

## Attendance
Aarush Mehrota, Gautam Mohandas, Eric Wang, Mark Escarrilla, Kilhoon Kim, Travis Huang, Victoria Tran, Srideep Dornala

---

## Goals/TODO

- Get ADRs on repo and submitted to Gradescope by tomo morning  
- Get video done tonight/tomo morning  
- Can make ADR about pipeline decisions  
- Get most of CI/CD pipeline today  

---

## Meeting Notes

- Getting started on CI/CD pipeline - **DUE Sunday**  
- For now have:
  - Passing HTML, CSS  
  - Checking for JS docs  
- Need to get started on draw.io diagram  
- Get video up tonight or tomorrow morning  
- By tonight, get random test files into the pipeline to show it works  
- Main thing needed for pipeline assignment is `phase1.md` with current status and what is planned  

### Figure out steps for pipeline
Just do these for now and explain other future steps in the md (like unit tests):
- Linting and code style enforcement (may happen in pipeline and/or in editor)  
- Code quality via tool (ex. Codeclimate, Codacy, etc.)  
- Code quality via human review (ex. Pull Requests) - already have  

---

## Group Assignments (4 rooms)

### HTML  
- Gautam, Travis, Victoria  
- Html-hint  
- Html-validate  

> To run outside validator:  
> `vnu-jar`  

### CSS  
(no members listed explicitly)

### JS  
- Srideep, Mark  

### IO  
- Aarush, Eric, Kilhoon  

---

### Other Notes

- Doesn’t make sense to break up into languages - break up into **issues**  
- One group does **linting** and the other does **code quality**  
- We can set up **unit tests** to show that we know how to do it - work on this if we have time  
- Work on **draw.io first** so we know what the goal is (in the GitHub)  

### Task Allocation

- **Linting and Validating** (3 people)  
  - Using **HTMLHint** for validating  

- **Automated Documentation** (2 people)  

- **Unit Tests** (should have most people)  
  - Make dummy files  
