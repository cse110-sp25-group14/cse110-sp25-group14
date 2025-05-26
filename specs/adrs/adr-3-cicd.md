# CI/CD Pipeline Development

| status   | date       | decision-makers                            | consulted                                | informed                                |
| -------- | ---------- | ------------------------------------------ | ---------------------------------------- | --------------------------------------- |
| accepted | 2025-05-11 | Aarush, Gautam, Andy (Kilhoon), Eric, Srideep | Mark, Nilay, Emily, Victoria, Carl, Travis | All team members (see deicsion-markers and consulted) |

## Context and Problem Statement

The team required a streamlined solution to automate testing and deployment processes directly from our main GitHub branch. The goal was to reduce manual overhead, minimize errors, and enforce consistency through automated checks.

## Decision Drivers

- Integration simplicity due to existing GitHub repository usage.
- Necessity of automated testing and deployment to maintain code quality and efficiency.
- Requirement for automated documentation generation via JSDocs.
- Need for human accountability through mandatory pull request reviews.

## Considered Options

- GitHub Actions

(Note: Other CI/CD tools were not considered due to strong integration advantages with GitHub Actions and team familiarity.)

## Decision Outcome

**Chosen Option:** GitHub Actions  
Selected due to seamless integration with GitHub repository, offering automated testing, linting, JSDocs generation, unit tests, and human review steps directly within the team's established workflow. This choice was confirmed by the team leaders, Aarush and Gautam, after team-wide consultation.

## Consequences

- **Good:**
  - Centralized management within a single repository.
  - Improved accountability through mandatory human review on pull requests.
  - Enhanced efficiency through automated documentation generation and continuous testing.
  
- **Bad:**
  - Potential slowdown of hotfix deployment due to enforced review process.
  - Reduced flexibility when only one team member is available, potentially delaying urgent fixes.

## Confirmation

This decision was confirmed and approved by team leaders Aarush and Gautam after consultation and agreement among all team members. The implementation has already been successfully completed as of 5/25/25.

