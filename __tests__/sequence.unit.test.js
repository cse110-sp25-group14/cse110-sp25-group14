import { expect, test, beforeEach } from "@jest/globals";
import { SequenceGame } from "../scripts/sequence.js";

let game;

beforeEach(() => {
	document.body.innerHTML = `
		<div id="start-btn"></div>
		<div id="difficulty-btn"></div>
		<div id="card-grid"></div>
	`;
	
	game = new SequenceGame();
});
  
// test("page renders 9 cards", () => {
// 	const cards = document.querySelectorAll("#card-grid .card");
// 	expect(cards.length).toBe(9);
// });
 
// test("Play button is present and visible before starting", () => {
// 	const playBtn = document.getElementById("start-btn");
// 	expect(playBtn).not.toBeNull();
// 	const hidden =
// 		 playBtn.hidden ||
// 		 playBtn.style.display === "none" ||
// 		 playBtn.classList.contains("hidden") ||
// 		 playBtn.classList.contains("hide");
// 	expect(hidden).toBe(false); // should be visible initially
// });
 
// test("clicking Play hides button and attaches click listeners to cards", () => {
// 	const playBtn = document.getElementById("start-btn");
// 	playBtn.click(); // simulate user click
 
// 	/* Button should now be hidden by sequence.js */
// 	const hidden =
// 		 playBtn.hidden ||
// 		 playBtn.style.display === "none" ||
// 		 playBtn.classList.contains("hidden") ||
// 		 playBtn.classList.contains("hide");
// 	expect(hidden).toBe(true);
 
// 	/* Verify a card responds to click without throwing */
// 	const firstCard = document.querySelector("#card-grid .card");
// 	expect(() => {
// 		firstCard.dispatchEvent(new window.Event("click"));
// 	}).not.toThrow();
// });

test("generateGrid generates the amount of cards corresponding to the gridSize", () => {
	const sizes = [3, 4, 5];
	for (const size of sizes) {
		game.gridSize = size;
		game.generateGrid();
		const cards = document.querySelectorAll(".card");
		expect(cards.length).toBe(size*size);
	}
});

test("initializeCardList removes play button", () => {
	game.initializeCardList();
	expect(document.getElementById("start-btn").style.display).toBe("none");
});

test("initializeCardList creates array of card elements", () => {
	game.initializeCardList();
	game.gridSize = 3;
	expect(game.cardList.length).toBe(9);

	for (const card of game.cardList) {
		expect(card instanceof HTMLElement).toBe(true);
	}
});

test("playCards adds a card to the current sequence", () => {
	game.playCards();
});
 
