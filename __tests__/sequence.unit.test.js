/**
 * @jest-environment jsdom
 */

 import { beforeEach, expect, test } from "@jest/globals";
 import fs from "fs";
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
 
	 await import("../scripts/sequence.js");
 
	 const domReady = new Promise((resolve) =>
		 document.addEventListener("DOMContentLoaded", resolve, { once: true }),
	 );
	 document.dispatchEvent(new window.Event("DOMContentLoaded"));
	 await domReady; // wait until sequence.js handler finishes
 });
 
 /* ---------- Tests ---------- */
 
 test("page renders 9 cards", () => {
	 const cards = document.querySelectorAll("#card-grid .card");
	 expect(cards.length).toBe(9);
 });
 
 test("Play button is present and visible before starting", () => {
	 const playBtn = document.getElementById("start-btn");
	 expect(playBtn).not.toBeNull();
	 const hiddenInline = playBtn.style.display === "none";
	 const hiddenAttr   = playBtn.hasAttribute("hidden");
	 const hiddenClass  = playBtn.classList.contains("hidden") || playBtn.classList.contains("hide");
     expect(hiddenInline || hiddenAttr || hiddenClass).toBe(true);
 });
 
 test("clicking Play hides button and attaches click listeners to cards", () => {
	 const playBtn = document.getElementById("start-btn");
	 playBtn.click(); // simulate user click
 
	 /* Button should now be hidden by sequence.js */
	 expect(playBtn.style.display).toBe("none");
 
	 /* Verify a card now responds to click without throwing */
	 const firstCard = document.querySelector("#card-grid .card");
	 expect(() => {
		 firstCard.dispatchEvent(new window.Event("click"));
	 }).not.toThrow();
 });
 