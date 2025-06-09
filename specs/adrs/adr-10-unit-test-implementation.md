### Architecture Decision Record

| status   | date decided | decision-makers      | consulted | informed |
|----------|--------------|----------------------|-----------|----------|
| proposed | 2025-05-27   | Mark, Eric, Srideep       | Aarush, Gautam, Travis, Nilay, Kilhoon, Victoria, Emily, Carl         | Aarush, Gautam, Travis, Nilay, Kilhoon, Victoria, Emily, Carl           |

# ADR – Adopt Jest for Unit Testing with jsdom Environment

---

## Context and Problem Statement

Each JavaScript file interacts with DOM elements and uses browser-like behavior (e.g., image sources, element creation, localStorage). A browser-mocking unit test environment is needed to validate functionality across DOM and logic layers.

---

## Decision Drivers

- Need to simulate and test DOM operations (e.g., `document.querySelector`, `click()`, `localStorage`).
- Works with ES2022 modules.
- Compatibility with CI and simple local test running.
- Support for mocking browser APIs and timers (e.g., `setInterval`, `localStorage`).

---

## Considered Options

1. **Jest with `jsdom` (chosen)**  
   - Jest was used in labs.
   - Popular, well-documented, and actively maintained.  
   - Built-in mocking and timer utilities.  
   - Supports ESM with configuration.  
   - Easily extended to E2E testing with Puppeteer.

2. **Vitest**  
   - Modern and fast alternative to Jest.  
   - Better suited for Vite-based projects.  
   - Less mature and established compared to Jest.

---

## Decision Outcome

**Chosen:** Use **Jest** with `jsdom` environment for unit testing.

Configuration:

```json
{
	"devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  	},
	"type": "module",
  	"scripts": {
    	"test:unit": "node --experimental-vm-modules ./node_modules/.bin/jest --config jest.unit.config.js"
	},
}
```

jest.unit.config.js:

```js
export default {
  transform: {},
  verbose: true,
  testEnvironment: "jsdom",
  testMatch: ["**/*.unit.test.js"]
};
```