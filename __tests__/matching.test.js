import { expect, test, jest, beforeEach } from "@jest/globals";
import { MatchingGame } from "../scripts/matching.js";

let game;

beforeEach(() => {
	document.body.innerHTML = `
		<div id="stopwatch"></div>
		<div id="move-counter"></div>
		<div id="record-moves"></div>
		<div id="record-time"></div>

		<div id="card-grid">
			<div class="card-row">
				<img class="card" />
    			<img class="card" />
			</div>
			<div class="card-row">
				<img class="card" />
    			<img class="card" />
			</div>
		</div>

		<div id="start-btn"></div>
	`;

	game = new MatchingGame();
});

test("startStopwatch updates stopwatch element", () => {
	const stopwatch = document.getElementById("stopwatch");

	jest.useFakeTimers();
	game.startStopwatch();
	jest.advanceTimersByTime(3000);

	expect(stopwatch.textContent).toBe("00:03");
});

test("shuffle properly shuffles array", () => {
	const orig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	let arr = [...orig];

	let sameOrderCount = 0;
	for (let i = 0; i < 100; i++) {
		game.shuffle(arr);
		if (JSON.stringify(arr) === JSON.stringify(orig)) {
			sameOrderCount++;
		}
	}

	expect(sameOrderCount).toBeLessThan(5);
});

test("shuffle doesn't modify elements", () => {
	const orig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	let arr = [...orig];

	game.shuffle(arr);
	arr.sort((a, b) => a - b);

	console.log(arr);
	expect(arr).toEqual(orig);
});

test("createBoard assigns data-number and adds click listener to each card", () => {
	// remove the functionality of these functions
	jest.spyOn(game, "hideButton").mockImplementation(() => {});
	jest.spyOn(game, "unflipAll").mockImplementation(() => {});
	const mockFlipCard = jest.spyOn(game, "flipCard").mockImplementation(() => {});

	game.createBoard();

	const cards = document.getElementsByClassName("card");
	for (const card of cards) {
		expect(card.dataset.number).toBeDefined();
		card.click();
		expect(mockFlipCard).toHaveBeenCalled();
	}

});

test("unflipAll sets all card images to the same image", () => {
	game.unflipAll();

	// if all cards have the same image, they are all unflipped
	const cards = document.getElementsByClassName("card");
	const firstCardImage = cards[0].src;
	for (const card of cards) {
		const cardImage = card.src;
		expect(cardImage).not.toBe("");
		expect(cardImage).toBe(firstCardImage);
	}
});

test("flipCard adds to card classList", () => {
	const card = document.querySelector(".card");
	card.src = "./assets/G14.png";

	game.flipCard({ currentTarget: card });

	expect(card.classList.contains("flipped")).toBe(true);
});

test("flipCard changes image source", () => {
	const card = document.querySelector(".card");
	card.src = "./assets/G14.png";
	card.dataset.number = "1";


	const originalSrc = card.src;
	game.flipCard({ currentTarget: card });

	expect(card.src).not.toBe(originalSrc);
	expect(card.src).toMatch(/matching\d+\.svg$/); // pattern match the string (no way to test which image exactly)
});

test("checkMatch updates data of matching cards", () => {
	const cards = document.getElementsByClassName("card");
	cards[0].dataset.number = "1";
	cards[1].dataset.number = "1";

	game.firstCard = cards[0];
	game.secondCard = cards[1];

	game.checkMatch();

	expect(cards[0].classList.contains("matched")).toBe(true);
	expect(cards[1].classList.contains("matched")).toBe(true);
});

test("endGame updates record moves and record time", () => {
	game.moves = 5;
	game.bestMoves = 10;
	game.startTime = new Date(Date.now() - 2000);
	game.bestTime = 4000;

	game.endGame();

	const recordMoves = document.getElementById("record-moves");
	const recordTime = document.getElementById("record-time");
	expect(recordMoves.textContent).toBe("Record Moves - 5");
	expect(recordTime.textContent).toBe("Record Time - 00:02");
});