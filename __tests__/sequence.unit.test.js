import { beforeEach, expect, test } from "@jest/globals";
import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";
 
/* ---------- resolve dirname in ESM ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
 
/* ---------- load raw HTML ---------- */
const html = fs.readFileSync(
	path.join(__dirname, "../sequence.html"),
	"utf8",
);
 
let document;
 
/* ---------- reset DOM & run page script before each test ---------- */
beforeEach(async () => {
	document = window.document;
	document.documentElement.innerHTML = html;
 
	/* 1️⃣  Import script that registers event-listeners */
	await import("../scripts/sequence.js");          // correct path
 
	/* 2️⃣  Fire DOMContentLoaded on *window* (where sequence.js listens) */
	const domReady = new Promise((resolve) =>
		window.addEventListener("DOMContentLoaded", resolve, { once: true }),
	);
	window.dispatchEvent(new window.Event("DOMContentLoaded"));
	await domReady;
});
 
/* ---------- Tests ---------- */
 
test("page renders 9 cards", () => {
	const cards = document.querySelectorAll("#card-grid .card");
	expect(cards.length).toBe(9);
});
 
test("Play button is present and visible before starting", () => {
	const playBtn = document.getElementById("start-btn");
	expect(playBtn).not.toBeNull();
	const hidden =
		 playBtn.hidden ||
		 playBtn.style.display === "none" ||
		 playBtn.classList.contains("hidden") ||
		 playBtn.classList.contains("hide");
	expect(hidden).toBe(false); // should be visible initially
});
 
test("clicking Play hides button and attaches click listeners to cards", () => {
	const playBtn = document.getElementById("start-btn");
	playBtn.click(); // simulate user click
 
	/* Button should now be hidden by sequence.js */
	const hidden =
		 playBtn.hidden ||
		 playBtn.style.display === "none" ||
		 playBtn.classList.contains("hidden") ||
		 playBtn.classList.contains("hide");
	expect(hidden).toBe(true);
 
	/* Verify a card responds to click without throwing */
	const firstCard = document.querySelector("#card-grid .card");
	expect(() => {
		firstCard.dispatchEvent(new window.Event("click"));
	}).not.toThrow();
});
 
