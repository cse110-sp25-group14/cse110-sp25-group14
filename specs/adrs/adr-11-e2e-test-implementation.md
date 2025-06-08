### Architecture Decision Record

| status   | date decided | decision-makers      | consulted | informed |
|----------|--------------|----------------------|-----------|----------|
| proposed | 2025-05-27   | Mark, Eric, Srideep       | Aarush, Gautam, Travis, Nilay, Kilhoon, Victoria, Emily, Carl         | Aarush, Gautam, Travis, Nilay, Kilhoon, Victoria, Emily, Carl           |

# ADR – Add E2E Testing with Jest and Puppeteer

---

## Context and Problem Statement

Each JavaScript file interacts with DOM elements and uses browser-like behavior (e.g., image sources, element creation, `localStorage`). Browser simulation is needed to ensure gameplay correctness and DOM rendering under realistic conditions. This is especially important for testing dynamic behaviors (e.g., flipping cards, animations, timer updates) and catching integration-level bugs.

---

## Decision Drivers

- Validate actual UI behavior in a simulated browser.
- Verify full website flow from start to completion.
- Works with ES2022 modules.
- Compatibility with CI and scriptable local test running.

---

## Considered Options

1. **Jest with Puppeteer and http-server (chosen)**  
   - Puppeteer was used in labs.  
   - Integrates directly with the existing Jest-based setup.  
   - Simulates full browser environment.  
   - Scriptable API for DOM access, clicking, waiting, and visual verification.
   - Allows E2E testing in the CI pipeline.

3. **Playwright**  
   - Modern version of Puppeteer.
   - Supports multiple browsers.  
   - Slightly heavier and more complex setup.  
   - Not used in labs; unfamiliar tooling for the team.

---

## Decision Outcome

**Chosen:** Use **Jest** with **Puppeteer** for E2E testing.

Configuration:

```json
{
	"devDependencies": {
		"jest": "^29.7.0",
		"jest-puppeteer": "^11.0.0",
		"puppeteer": "^24.9.0"
	},
	"type": "module",
	"scripts": {
		"test:e2e": "node --experimental-vm-modules ./node_modules/.bin/jest --config jest.e2e.config.js"
	}
}
```

jest-puppeteer.config.js
```js
export default {
	launch: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: true,
	},
	server: {
		command: "npm run start",
		port: 3000,
		launchTimeout: 10000,
		debug: true
	}
};
```
