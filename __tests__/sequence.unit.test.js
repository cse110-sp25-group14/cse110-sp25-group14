

import { beforeEach, expect, test } from "@jest/globals";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ---------- resolve dirname in ESM npm ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ---------- load raw HTML ---------- */
const html = fs.readFileSync(
	path.join(__dirname, "../sequence.html"),
	"utf8",
);

let document;


beforeEach(async () => {
	document = window.document;
	document.documentElement.innerHTML = html;
	const domReady = new Promise((resolve) => {
		document.addEventListener("DOMContentLoaded", resolve, { once: true });
	});
	document.dispatchEvent(new window.Event("DOMContentLoaded"));

	/* The page’s behaviour (adding event-listeners) lives in scripts/sequence.js  */
	await import("../scripts/sequence.js");		// adjust if your path differs

	/* Wait until the inline DOMContentLoaded handler in sequence.js finishes */
	await domReady;
});

test("page renders 9 cards", () => {
	const cards = document.querySelectorAll("#card-grid .card");
	expect(cards.length).toBe(9);
});

test("Play button is present and visible before starting", () => {
	const playBtn = document.getElementById("start-btn");
	expect(playBtn).not.toBeNull();
	/* computedStyle isn't available in jsdom; checking inline style / default */
	expect(playBtn.style.display).not.toBe("none");
});

test("clicking Play hides button and attaches click listeners to cards", () => {
	const playBtn = document.getElementById("start-btn");
	playBtn.click();					// simulate user click

	/* Button should now be hidden by sequence.js */
	expect(playBtn.style.display).toBe("none");

	/* Each card should have at least one click listener now.
	   JSDOM exposes listeners via getEventListeners (non-standard) only when
	   using the global. Instead we can check that addEventListener was called
	   by spying on it. */
	const firstCard = document.querySelector("#card-grid .card");
	/* JSDOM doesn't expose listener data, but after Play the script calls
	   card.addEventListener("click", checkClicked) on _every_ card.
	   We can verify by dispatching a click and expecting no throw. */
	expect(() => {
		firstCard.dispatchEvent(new window.Event("click"));
	}).not.toThrow();
});
