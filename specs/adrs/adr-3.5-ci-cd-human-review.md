# ADR 3.5: Updates to Pull Request and Merge Process

| status   | date       | decision-makers | consulted        | informed         |
| -------- | ---------- | --------------- | ---------------- | ---------------- |
| accepted | 2025-05-01 | Aarush Mehrotra | All team members | All team members |

## Context and Problem Statement

The existing CI/CD pipeline implemented via GitHub Actions successfully automated testing, documentation generation, and basic code quality checks. However, the team identified a potential risk in the pull request and merge workflow, specifically regarding unintended changes, errors, or malicious modifications (griefing) being directly introduced into the main branch.

## Decision Drivers

* Need for increased accountability and code quality assurance.
* Necessity to shift responsibility for bugs and errors from individuals to the team’s collective review process.
* Desire to prevent accidental merges and unauthorized modifications.

## Considered Options

* Implement branch protection rules on GitHub requiring mandatory human reviews for pull requests.

(Note: No alternative options were seriously considered due to the seamless integration and simplicity provided by existing GitHub workflows.)

## Decision Outcome

**Chosen Option:** Implement mandatory human review via branch protection rules.

The main branch is now protected, ensuring:

* Pull requests must have at least one human reviewer approval.
* The reviewer cannot be the person who initiated the pull request.
* This step is integrated into the existing CI/CD workflow to serve as a final check before merges.

## Consequences

* **Good:**

  * Improved team accountability and reduction of individual blame.
  * Enhanced code quality due to mandatory peer reviews.
  * Increased protection against accidental or malicious merges.

* **Bad:**

  * Potential delay in urgent fixes or hotfixes due to mandatory review requirement.
  * Possible workflow bottlenecks when fewer team members are available to perform reviews.

## Confirmation

This decision has been confirmed and approved by Aarush Mehrotra following comprehensive consultation with all team members. The updated process is active as of 2025-05-01.
