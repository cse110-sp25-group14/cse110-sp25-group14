/**
 * @class MatchingGame
 * @classdesc Implements the entire Matching-Pairs memory game, including UI wiring,
 *            theme handling, record tracking, and stopwatch timing.
 */
export class MatchingGame {
	/**
	 * @constructor
	 * @description Initializes card data, per-game state, timers, and theme labels.
	 * @returns {MatchingGame} A new game instance.
	 */
	constructor() {
		// game data
		this.cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];

		// game state tracking
		this.firstCard = null;
		this.secondCard = null;
		this.lockBoard = false;
		this.moves = 0;
		this.bestMoves = Infinity;
		this.bestTime = Infinity;

		// timing
		this.startTime = null;
		this.stopwatchInterval = null;

		//possible themes for user to choose from
		this.themeLabels = {
			Default: "Default",
			Cultures: "Cultures",
		};
		//set theme to default
		this.selectedTheme = "Default";

	}

	/**
	 * @function init
	 * @description Sets up buttons, dark-mode toggle, loads persistent records, and displays the chosen theme label.
	 * @returns {void}
	 */
	init() {
		const backButton = document.getElementById("page-info");
		backButton.querySelector("img").addEventListener("click", () => {
			window.location.href = "homepage.html";
		});
		const playButton = document.getElementById("start-btn");
		playButton.addEventListener("click", this.createBoard.bind(this));
		const themeSelection = document.getElementById("theme-btn");
		themeSelection.addEventListener("click", this.toggleTheme.bind(this));
		this.updateThemeText();
		if (localStorage.getItem("darkMode") === "enabled") {
			document.body.classList.add("dark");
		}

		const themeToggle = document.getElementById("theme-toggle");
		const sunIcon = document.querySelector(".theme-icon.sun");
		const moonIcon = document.querySelector(".theme-icon.moon");
		const root = document.documentElement;

		function updateTooltip() {
			const isDark = document.body.classList.contains("dark");
			root.style.setProperty("--tooltip-text", isDark ? "\"Light Mode\"" : "\"Dark Mode\"");
		}

		if (themeToggle) {
			themeToggle.sunIcon = sunIcon;
			themeToggle.moonIcon = moonIcon;

			themeToggle.addEventListener("click", function () {
				document.body.classList.toggle("dark");
				const isDark = document.body.classList.contains("dark");

				if (this.sunIcon && this.moonIcon) {
					this.sunIcon.style.opacity = isDark ? "0" : "1";
					this.moonIcon.style.opacity = isDark ? "1" : "0";
				}

				localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
				updateTooltip();
			});

			const isDark = localStorage.getItem("darkMode") === "enabled";
			if (isDark) {
				document.body.classList.add("dark");
				if (sunIcon && moonIcon) {
					sunIcon.style.opacity = "0";
					moonIcon.style.opacity = "1";
				}
			}
			updateTooltip();
		}

		const recordButton = document.getElementById("leaderboard-btn");
		if (recordButton) {
			recordButton.addEventListener("click", () => {
				window.location.href = "records.html";
			});
		}

		this.loadRecords();
	}

	/**
	 * @function toggleTheme
	 * @description Cycles the board theme between “Default” and “Cultures”
	 *              and updates the theme button text.
	 * @returns {void}
	 */
	toggleTheme() {
		this.selectedTheme = this.selectedTheme === "Default" ? "Cultures" : "Default"; // Toggle theme
		this.updateThemeText(); // Update the theme button text

	}

	/**
	 * @function updateThemeText
	 * @description Writes the current theme label into the theme-toggle button.
	 * @returns {void}
	 */
	updateThemeText() {
		const button = document.getElementById("theme-btn");
		button.querySelector("span").textContent = `Theme: ${this.themeLabels[this.selectedTheme]}`;
	}

	/**
	 * @function shuffle
	 * @description Randomly reorders the supplied array in place.
	 * @param {any[]} array - The array of cards to shuffle.
	 * @returns {void}
	 */
	shuffle(array) {
		array.sort(() => 0.5 - Math.random());
	}

	/**
	 * @function startStopwatch
	 * @description Starts a one-second interval timer and renders elapsed time (MM:SS) into the “stopwatch” span.
	 * @returns {void}
	 */
	startStopwatch() {
		this.startTime = Date.now();
		this.stopwatchInterval = setInterval(() => {
			const elapsedTime = Date.now() - this.startTime;
			const seconds = Math.floor(elapsedTime / 1000);
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;

			document.getElementById("stopwatch").textContent = 
				`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		}, 1000);
	}

	/**
	 * @function stopStopwatch
	 * @description Clears the running interval and prevents further ticks.
	 * @returns {void}
	 */
	stopStopwatch(){
		//save time if it beats record
		if(this.stopwatchInterval){
			clearInterval(this.stopwatchInterval);
			this.stopwatchInterval = null;
		}
	}

	/**
	 * @function createBoard
	 * @description Shuffles cards, lays them face-down on the grid, resets move counter and stopwatch, and disables theme changes during play.
	 * @returns {void}
	 */
	createBoard() {
		// Disable the theme toggle button once the game starts
		const themeButton = document.getElementById("theme-btn");
		if (themeButton) {
			themeButton.disabled = true; //disable theme button upon board creation
		}
		this.moves = 0;
		document.getElementById("move-counter").textContent = "Moves - 0";
		this.hideButton();
		this.unflipAll();
		this.startStopwatch();
		const grid = document.getElementById("card-grid");
		const rows = grid.getElementsByClassName("card-row");
		this.shuffle(this.cards);
		for(let i = 0; i<rows.length; i+=1){
			const cardArr = rows[i].getElementsByClassName("card");
			for(let j = 0; j<cardArr.length; j+=1){
				const cardElement = cardArr[j];
				cardElement.dataset.number = this.cards[j+i*rows.length];
				cardElement.addEventListener("click", this.flipCard.bind(this));
				//for testing: makes all cards face up and matched
				// const image = cardElement.querySelector("img");
				// image.src = `./assets/matching${cardElement.dataset.number}.svg`;
				// cardElement.classList.add("matched");
				if(cardElement.classList.contains("matched")){
					cardElement.classList.remove("matched");
				}
			}
		}
	}

	/**
	 * @function unflipAll
	 * @description Turns every card face-down and removes “matched” state.
	 * @returns {void}
	 */
	unflipAll(){
		const cardArr = document.getElementsByClassName("card");
		for(let i = 0; i<cardArr.length; i+=1){
			cardArr[i].className = "card";
			cardArr[i].src = "../assets/G14.png";
		}
	}

	/**
	 * @function hideButton
	 * @description Temporarily hides the “Start” button once a game begins.
	 * @returns {void}
	 */
	hideButton(){
		const playButton = document.getElementById("start-btn");
		playButton.style.display = "none";
	}

	/**
	 * @function flipCard
	 * @description Handles a user click: shows the card’s face, tracks first/second selections, then calls checkMatch().
	 * @param {MouseEvent} event - The click event.
	 * @returns {void}
	 */
	flipCard(event) {
		// Do not let user change theme mid-game
		const themeButton = document.getElementById("theme-btn");
		if (themeButton) {
			themeButton.disabled = true; // Disable theme button 
		}
		const card = event.currentTarget;
		if (this.lockBoard || card === this.firstCard || card.classList.contains("matched")) return;
		//if cultures theme is selected, use cultures icons, otherwise use default matching icons
		if(this.selectedTheme === "Cultures") {
			card.src = `../assets/icons/icon${card.dataset.number}.png`;
		}
		else{
			card.src = `../assets/matching${card.dataset.number}.svg`;
		}

		card.classList.add("flipped");
		if (!this.firstCard) {
			this.firstCard = card;
		} else {
			this.secondCard = card;
			this.checkMatch();
		}
	}

	/**
	 * @function checkMatch
	 * @description Compares the two flipped cards, updates move count, marks matches, or flips cards back after a delay.
	 * @returns {void}
	 */
	checkMatch() {

		this.moves += 1;
		document.getElementById("move-counter").textContent = `Moves - ${this.moves}`;

		if (this.firstCard.dataset.number === this.secondCard.dataset.number) {
			this.firstCard.classList.add("matched");
			this.secondCard.classList.add("matched");
			this.resetBoard();

			const matchedCards = document.querySelectorAll(".matched").length;
			if (matchedCards === this.cards.length){
				this.stopStopwatch();
				setTimeout(() =>{
					this.endGame();
				}, 200);
				return;
			}

		} else {
			this.lockBoard = true;
			setTimeout(() => {
				this.firstCard.src = "../assets/G14.png";
				this.secondCard.src = "../assets/G14.png";
				this.firstCard.classList.remove("flipped");
				this.secondCard.classList.remove("flipped");
				this.resetBoard();
			}, 500);
		}
	}

	/**
	 * @function resetBoard
	 * @description Clears first/second card refs and unlocks the board for the next turn.
	 * @returns {void}
	 */
	resetBoard() {
		[this.firstCard, this.secondCard, this.lockBoard] = [null, null, false];
	}

	/**
	 * @function endGame
	 * @description Stops the stopwatch, saves records to localStorage, updates best-of displays, and navigates to the results page.
	 * @returns {void}
	 */
	endGame(){

		const recordToSave = {
			moves: this.moves,
			time : document.getElementById("stopwatch").textContent
		};
		let history = JSON.parse(localStorage.getItem("matching")) || [];
		history.push(recordToSave);
		localStorage.setItem("matching", JSON.stringify(history));

		const elapsedTime = Date.now() - this.startTime;

		if (this.moves < this.bestMoves) {
			this.bestMoves = this.moves;
			document.getElementById("record-moves").textContent =
		`Record Moves - ${this.bestMoves}`;
		}

		if (elapsedTime < this.bestTime) {
			this.bestTime = elapsedTime;
			const totalSec = Math.floor(this.bestTime / 1000);
			const mins     = Math.floor(totalSec / 60);
			const secs     = totalSec % 60;
			document.getElementById("record-time").textContent =
		`Record Time - ${mins.toString().padStart(2,"0")}:${secs
			.toString().padStart(2,"0")}`;
		}

		this.resetBoard();
		const playButton = document.getElementById("start-btn");
		playButton.style.display = "block";
		playButton.addEventListener("click", this.createBoard.bind(this));

		window.location.href = "result-matching.html";
		// Allow user to change theme again when game ends
		const themeButton = document.getElementById("theme-btn");
		if (themeButton) {
			themeButton.disabled = false; // Enable theme button 
		}
	}

	/**
	 * @function loadRecords
	 * @description Loads saved “matching” results from localStorage and writes the best moves and best time onto the page.
	 * @returns {void}
	 */
	loadRecords() {
		const records = JSON.parse(localStorage.getItem("matching")) || [];
		if (records.length > 0) {
			const sortedMoves = records
				.map((record) => record.moves)
				.sort((a, b) => a - b);
				
			this.bestMoves = sortedMoves[0];
			document.getElementById("record-moves").textContent =
				`Record Moves - ${this.bestMoves}`;	
				
			const sortedTimes = records
				.map((record) => record.time)
				.sort((a, b) => a - b);
				
			document.getElementById("record-time").textContent = 
				`Record Time - ${sortedTimes[0]}`;

			const mins = parseInt(sortedTimes[0].slice(0, 2));
			const secs = parseInt(sortedTimes[0].slice(3));
			this.bestTime = ((mins * 60) + secs) * 1000;
		};
	}
}


window.addEventListener("DOMContentLoaded", () => {
	const game = new MatchingGame();
	game.init();
});
