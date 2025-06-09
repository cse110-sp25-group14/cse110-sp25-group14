import { expect, test, beforeEach } from "@jest/globals";
import { SequenceGame } from "../scripts/sequence.js";

let game;

beforeEach(() => {
	document.body.innerHTML = `
		<div id="start-btn"></div>
		<div id="stats-grid">
            <p></p>
            <p></p>
            <button id="difficulty-btn"></button>
        </div>
		<div id="card-grid"></div>

	`;
	
	game = new SequenceGame();
});

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

test("playCards adds one card to sequence", async () => {
	game.onTime = 10;
	game.delayTime = 10;

	game.initializeCardList();
	const initialLength = game.cards.length;
	await game.playCards();

	expect(game.cards.length).toBe(initialLength + 1);
});

test("checkRecord updates level and record elements correctly", () => {
	const level = 5;
	game.record = 0;
	game.checkRecord(level);

	const stats = document.querySelectorAll("#stats-grid p");
	expect(stats[0].innerHTML).toBe(`Level - ${level}`);
	expect(stats[1].innerHTML).toBe(`Record - ${level}`);
	expect(game.record).toBe(level);
});

test("checkRecord only updates record if new value is higher", () => {
	game.record = 7;
	game.checkRecord(5);

	const stats = document.querySelectorAll("#stats-grid p");
	expect(stats[1].innerHTML).toBe("");
});

test("endGame stores record", () => {
	game.cards = [1, 2, 3];
	game.endGame();

	const saved = JSON.parse(localStorage.getItem("sequence-recent"));
	expect(saved).toEqual({ difficulty: "easy", level: 2 });
});

test("endGame clears cards", () => {
	game.cards = [1, 2, 3];
	game.cardList = Array.from({ length: 9 }, () => {
		const el = document.createElement("div");
		el.addEventListener("click", () => {});
		return el;
	});

	game.endGame();

	expect(game.cards.length).toBe(0);
	expect(game.cardList.length).toBe(0);
});
 
