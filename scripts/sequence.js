/**
 * Sequence game Java Script 
 * @file sequence.js
 */

export class SequenceGame {
	constructor() {
		/**
		 * Global variables for the game
		 * @type {Array<HTMLElement>} cardList - list of card elements on the page.
		 * @type {Array<number>} cards - Indices of card for sequence card.
		 * @type {number} currPointer - current position in the sequence game where user playing.
		 * @type {number} record - user's current record
		 * @type {number} onTime - Duration cards stay highlight
		 * @type {number} delayTime - Delay between card highlight
		 * @type {string} selectedDifficulty - current difficulty
		 * @type {number} gridSize - grid size of current game depends on difficulty
		 * @type {number} cardsInPlay - Total number of cards in the grid. 
		 */
		this.cardList = [];
		this.cards = [];
		this.currPointer = 0;
		this.record = 0;
		this.onTime = 400;
		this.delayTime = 500;
		this.selectedDifficulty = "easy";
		this.gridSize = 3;
		this.cardsInPlay = 9;

		/**
		 * Labels for difficulty levels for the game
		 * @const {Object} difficultyLabels
		 */
		this.difficultyLabels = {
			easy: "Easy",
			medium: "Medium",
			hard: "Hard"
		};

		/**
		 * @func timer
		 * @param {number} ms - time in ms to wait
		 * @returns {Promise} - A promise that resolves after the specific time.
		 */
		this.timer = ms => new Promise(res => setTimeout(res, ms));
	}

	/**
	 * @description
	 * Initialize the game board and set up event listeners for buttons at the sequence page.
	 * Set up localstorage for dark mode.
	 * @func init
	 */
	init() {
		const backButton = document.getElementById("page-info");
		backButton.querySelector("img").addEventListener("click", ()=>{
			window.location.href = "homepage.html";
		});
		const playButton = document.getElementById("start-btn");
		playButton.addEventListener("click", this.initializeCardList.bind(this));

		const difficultySelection = document.getElementById("difficulty-btn");
		difficultySelection.addEventListener("click", () =>{
			this.toggleDifficulty();
			this.loadRecords();
			this.generateGrid(); //re-generate grid on click, so toggled difficulty can be visualized 
		});

		//set initial difficulty as well as dynamic button text and apply difficulty mods
		this.setDifficulties();
		this.updateDifficultyText();
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
		this.generateGrid();  //on page load add base grid 
	};

	/**
	 * @description
	 * Generates the game grid based on current difficulty
	 * @func generateGrid
	 */
	generateGrid() {
	//dynamically build grid based on chosen difficulty
		const grid = document.getElementById("card-grid");
		grid.innerHTML = "";

		//update CSS to cover 3 grid option sizes instead of being a harcoded 3 x 3
		//also adding auto-resizing if to support page responsivness on other devices --- NEEDS TO BE TESTED
		grid.style.gridTemplateColumns = `repeat(${this.gridSize}, minmax(60px, 1fr))`;

		//rebuild original HTML structure 
		//each row is now a <div class="card-row">
		//each card is now a <div class="card">
		//structure added under #card-grid
		for(let i = 0; i<this.gridSize; i+=1) {
			const row = document.createElement("div");
			row.className = "card-row";
			for(let j = 0; j<this.gridSize; j+=1) {
				const card = document.createElement("div");
				card.className = "card";
				row.appendChild(card);
			}
			grid.appendChild(row);
		}
	}

	/**
	 * @description
	 * Initializes the card list and starts game, generates all the base elements
	 * @func initializeCardList
	 */
	initializeCardList(){
		document.getElementById("difficulty-btn").disabled = true;
		const playButton = document.getElementById("start-btn");
		playButton.style.display = "none";
		this.currPointer = 0;
		this.cardList = [];
		this.cards = [];

		this.generateGrid();

		const grid = document.getElementById("card-grid");
		const rows = grid.getElementsByClassName("card-row");
		for(let i = 0; i<rows.length; i+=1){
			const cardArr = rows[i].getElementsByClassName("card");
			for(let j = 0; j<cardArr.length; j+=1){
				const cardElement = cardArr[j];
				this.cardList.push(cardElement);
			}
		}
		setTimeout(() => {
			this.playCards();
		}, 500);
	}

	/**
	 * @func appendRandom
	 * @description Adds a random card to current game
	 * @param {Array<number>} array - The array of card indices to append to
	 */
	appendRandom(array){
		array.push(Math.floor(Math.random() * this.cardsInPlay));
	}

	/**
	 * @description
	 * Cycles through the difficulties when the user clicks the button to change difficulties
	 * @func toggleDifficulty
	 */
	toggleDifficulty() {
		switch (this.selectedDifficulty){
			case "easy":
				this.selectedDifficulty = "medium";
				break;
			case "medium":
				this.selectedDifficulty = "hard";
				break;
			case "hard":
				this.selectedDifficulty = "easy";
				break;
		}
		this.setDifficulties();
		this.updateDifficultyText();
	}

	/**
	 * @description
	 * Sets up the game difficulty depending on the current difficulty. Each difficulty has a different number of cards in play and time between outputs.
	 * @func setDifficulties
	 */
	setDifficulties() {
		switch (this.selectedDifficulty){
			case "easy":
				this.onTime = 400;
				this.delayTime = 500;
				this.gridSize = 3;
				this.cardsInPlay = 9;
				break;
			case "medium":
				this.onTime = 200;
				this.delayTime = 300;
				this.gridSize = 4;
				this.cardsInPlay = 16;
				break;
			case "hard":
				this.onTime = 150;
				this.delayTime = 250;
				this.gridSize = 5;
				this.cardsInPlay = 25;
				break;
		}
	}

	/**
	 * @description
	 * Changes the outputted text to mirror the current game difficulty
	 * @func updateDifficultyText
	 */
	updateDifficultyText() {
		const button = document.getElementById("difficulty-btn");
		button.querySelector("span").textContent = 
			`Difficulty: ${this.difficultyLabels[this.selectedDifficulty]}`;
	}

	/**
	 * @description
	 * Asynchronous function because of the usage of timeout. Appends one more card to the current user sequence, shows the current sequence to the user, then unlocks all the cards for the user.
	 * @func playCards
	 */
	async playCards(){
		this.appendRandom(this.cards);
		for(let j = 0; j<this.cards.length; j+=1){
			const cardElement = this.cardList[this.cards[j]];
			cardElement.classList.add("unflipped");
			this.flipCard(cardElement);
			setTimeout(()=>{
				this.flipCard(cardElement);
			}, this.onTime);
			await this.timer(this.delayTime);
		}
		for(let i = 0; i<this.cardList.length; i+=1){
			const cardElement = this.cardList[i]; 
			this.unlock(cardElement);
		}
	}

	/**
	 * @description
	 * Checks if the card clicked is the correct card, if it isn't, it runs @see endGame, if it is and if it is the last card in the sequence the function runs @see playCards for the next sequence. 
	 * Will also run @see flipCard twice, with a timeout between both to show the user that the card has been clicked, and update the record through @see checkRecord if needed
	 * @func checkClicked
	 */
	async checkClicked(event){
		const card = event.currentTarget;
		this.lock(card);
		card.classList.add("unflipped");
		if(card != this.cardList[this.cards[this.currPointer]]){
			this.endGame();
			this.checkRecord(this.cards.length);
			setTimeout(()=>{
				this.flipCard(card);
			}, this.onTime);
			this.flipCard(card);
			return;
		}
		this.currPointer += 1;
		if(this.currPointer == this.cards.length){
			this.checkRecord(this.cards.length);
		}
		setTimeout(()=>{
			this.flipCard(card);
		}, this.onTime);
		this.flipCard(card);
		await this.timer(this.onTime);
		this.unlock(card);
		if(this.currPointer == this.cards.length){
			this.checkRecord(this.cards.length);
			this.currPointer = 0;
			for(let i = 0; i<this.cardList.length; i+=1){
				const cardElement = this.cardList[i]; 
				this.lock(cardElement);
			}
			await this.timer(this.delayTime);
			this.playCards();
		}
	}

	boundCheckClicked = this.checkClicked.bind(this);

	/**
	 * @description
	 * Basic function to lock the element from user input
	 * @func lock
	 * @param {Object} element
	 */
	lock(element){
		element.removeEventListener("click", this.boundCheckClicked, false);
	}

	/**
	 * @description
	 * Basic function to unlock the element from user input
	 * @func unlock
	 * @param {Object} element 
	 */
	unlock(element){
		element.addEventListener("click", this.boundCheckClicked);
	}

	/**
	 * @description
	 * Checks the if the new level beats the current record and updates the html appropriately
	 * @func checkRecord
	 * @param {number} val
	 */
	checkRecord(val){
		const statsGrid = document.getElementById("stats-grid");
		const stats = statsGrid.querySelectorAll("p");
		stats[0].innerHTML = `Level - ${val}`;
		if(val > this.record){
			this.record = val;
			stats[1].innerHTML = `Record - ${val}`;
		}
	}

	/**
	 * @description
	 * Saves the new score to localStorage, and locks all elements, then resets the cards and the sequence array and navigates to result-sequence.html file.
	 * @func endGame
	 */
	endGame(){
		const recordToSave = { 
			difficulty: this.selectedDifficulty, 
			level: this.cards.length - 1 
		};
		let history = JSON.parse(localStorage.getItem("sequence")) || [];
		history.push(recordToSave);
		localStorage.setItem("sequence", JSON.stringify(history));

		localStorage.setItem("sequence-recent", JSON.stringify(recordToSave));

		for(let i = 0; i<this.cardList.length; i+=1){
			const cardElement = this.cardList[i]; 
			this.lock(cardElement);
		}
		this.cards = [];
		this.cardList = [];
		document.getElementById("difficulty-btn").disabled = false;

		window.location.href = "result-sequence.html";
	}

	/**
	 * @description
	 * Flips the card by changing the card class between unflipped and flipped
	 * @func flipCard
	 * @param {Object} card
	 */
	flipCard(card){
		if(card.classList.contains("unflipped")){
		//card.style.backgroundColor = "purple";
			card.classList.add("card-click");
			card.classList.add("flipped");
			card.classList.remove("unflipped");
		}
		else{
			card.classList.remove("card-click");
			card.classList.add("unflipped");
			card.classList.remove("flipped");
		}
	}

	/**
	 * @description
	 * Displays the record and the current score
	 * @func loadRecords
	 */
	loadRecords() {
		const statsGrid = document.getElementById("stats-grid");
		const stats = statsGrid.querySelectorAll("p");
	
		const records = JSON.parse(localStorage.getItem("sequence")) || [];
		const filteredRecords = records.filter((record) => record.difficulty === this.selectedDifficulty);
		if (filteredRecords.length > 0) {
			const sortedLevels = filteredRecords
				.map((record) => record.level)
				.sort((a, b) => b - a);
				
			this.record = sortedLevels[0];
			stats[1].innerHTML = `Record - ${this.record}`;
		} else {
			this.record = 0;
			stats[1].innerHTML = `Record - 0`;
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const game = new SequenceGame();
	game.init();
});
