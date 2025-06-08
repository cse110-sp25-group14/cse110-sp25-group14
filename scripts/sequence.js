/**
 * Sequence game Java Script 
 * @file sequence.js
 */

window.addEventListener("DOMContentLoaded", init);

/**
 * Global variables for the game
 * @type {Array<HTMLElement>} cardList - list of card elements on the page.
 * @type {Array<number>} cards - Indices of card for sequence card.
 * @type {number} currPointer - current position in the sequence game where user playing.
 * @type {number} record - user's current record
 * @type {number} onTIme - Duration cards stay highlight
 * @type {number} delayTime - Delay between card highlight
 * @type {string} selectedDifficulty - current difficulty
 * @type {number} gridSie - grid size of current game depends on difficulty
 * @type {number} cardsInPlay - Total number of cards in the grid. 
 */
let cardList = [];
let cards = [];
let currPointer = 0;
let record = 0;
let onTime = 400;
let delayTime = 500;
let selectedDifficulty = "easy";
let gridSize = 3;
let cardsInPlay = 9;

/**
 * Labels for difficulty levels for the game
 * @const {Object} difficultyLabels
 */
const difficultyLabels = {
	easy: "Easy",
	medium: "Medium",
	hard: "Hard"
};

/**
 * @func timer
 * @param {number} ms - time in ms to wait
 * @returns {Promise} - A promise that resolves after the specific time.
 */
const timer = ms => new Promise(res => setTimeout(res, ms));

/**
 * @description
 * Initialize the game board and set up event listeners for buttons at the sequence page.
 * Set up localstorage for dark mode.
 * @func init
 */
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	const playButton = document.getElementById("start-btn");
	playButton.addEventListener("click", initializeCardList);

	const difficultySelection = document.getElementById("difficulty-btn");
	difficultySelection.addEventListener("click", () =>{
		toggleDifficulty();
		loadRecords();
		generateGrid(); //re-generate grid on click, so toggled difficulty can be visualized 
	});

	//set initial difficulty as well as dynamic button text and apply difficulty mods
	setDifficulties();
	updateDifficultyText();
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
	loadRecords();
	generateGrid();  //on page load add base grid 
};

/**
 * @description
 * Generates the game grid based on current difficulty
 * @func generateGrid
 */
function generateGrid() {
	//dynamically build grid based on chosen difficulty
	const grid = document.getElementById("card-grid");
	grid.innerHTML = "";

	//update CSS to cover 3 grid option sizes instead of being a harcoded 3 x 3
	//also adding auto-resizing if to support page responsivness on other devices --- NEEDS TO BE TESTED
	grid.style.gridTemplateColumns = `repeat(${gridSize}, minmax(60px, 1fr))`;

	//rebuild original HTML structure 
	//each row is now a <div class="card-row">
	//each card is now a <div class="card">
	//structure added under #card-grid
	for(let i = 0; i<gridSize; i+=1) {
		const row = document.createElement("div");
		row.className = "card-row";
		for(let j = 0; j<gridSize; j+=1) {
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
function initializeCardList(){
	document.getElementById("difficulty-btn").disabled = true;
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "none";
	currPointer = 0;
	cardList = [];
	cards = [];

	generateGrid();

	const grid = document.getElementById("card-grid");
	const rows = grid.getElementsByClassName("card-row");
	for(let i = 0; i<rows.length; i+=1){
		const cardArr = rows[i].getElementsByClassName("card");
		for(let j = 0; j<cardArr.length; j+=1){
			const cardElement = cardArr[j];
			cardList.push(cardElement);
		}
	}
	setTimeout(() => {
		playCards();
	}, 500);
}


/**
 * @func appendRandom
 * @description Adds a random card to current game
 * @param {Array<number>} array - The array of card indices to append to
 */
function appendRandom(array){
	array.push(Math.floor(Math.random() * cardsInPlay));
}

/**
 * @description
 * Cycles through the difficulties when the user clicks the button to change difficulties
 * @func toggleDifficulty
 */
function toggleDifficulty() {
	switch (selectedDifficulty){
		case "easy":
			selectedDifficulty = "medium";
			break;
		case "medium":
			selectedDifficulty = "hard";
			break;
		case "hard":
			selectedDifficulty = "easy";
			break;
	}
	setDifficulties();
	updateDifficultyText();
}

//set the actual values that increase our idea of difficulty
/**
 * @description
 * Sets up the game difficulty depending on the current difficulty. Each difficulty has a different number of cards in play and time between outputs.
 * @func setDifficulties
 */
function setDifficulties() {
	switch (selectedDifficulty){
		case "easy":
			onTime = 400;
			delayTime = 500;
			gridSize = 3;
			cardsInPlay = 9;
			break;
		case "medium":
			onTime = 200;
			delayTime = 300;
			gridSize = 4;
			cardsInPlay = 16;
			break;
		case "hard":
			onTime = 150;
			delayTime = 250;
			gridSize = 5;
			cardsInPlay = 25;
			break;
	}
}

/**
 * @description
 * Changes the outputted text to mirror the current game difficulty
 * @func updateDifficultyText
 */
function updateDifficultyText() {
	const button = document.getElementById("difficulty-btn");
	button.querySelector("span").textContent = `Difficulty: ${difficultyLabels[selectedDifficulty]}`;
}

//async function, since timeouts are used extensively for better user experience. code adds one extra card to the current user sequence, then shows all of the current cards in order (user buttons should be locked before this call). it will then unlock every card on the page
/**
 * @description
 * Asynchronous function because of the usage of timeout. Appends one more card to the current user sequence, shows the current sequence to the user, then unlocks all the cards for the user.
 * @func playCards
 */
async function playCards(){
	appendRandom(cards);
	for(let j = 0; j<cards.length; j+=1){
		const cardElement = cardList[cards[j]];
		cardElement.classList.add("unflipped");
		flipCard(cardElement);
		setTimeout(()=>{
			flipCard(cardElement);
		}, onTime);
		await timer(delayTime);
	}
	for(let i = 0; i<cardList.length; i+=1){
		const cardElement = cardList[i]; 
		unlock(cardElement);
	}
}

//when element is pressed and unlocked, this function is ran; it locks the current element, ends the game instantly if it is incorrect, or displays animation, increases currPointer, and checks if the user finished the sequence, which if they did, runs playCards again
/**
 * @description
 * Checks if the card clicked is the correct card, if it isn't, it runs @see endGame, if it is and if it is the last card in the sequence the function runs @see playCards for the next sequence. 
 * Will also run @see flipCard twice, with a timeout between both to show the user that the card has been clicked, and update the record through @see checkRecord if needed
 * @func checkClicked
 */
async function checkClicked(){
	lock(this);
	this.classList.add("unflipped");
	if(this != cardList[cards[currPointer]]){
		endGame();
		checkRecord(cards.length);
		setTimeout(()=>{
			flipCard(this);
		}, onTime);
		flipCard(this);
		return;
	}
	currPointer += 1;
	if(currPointer == cards.length){
		checkRecord(cards.length);
	}
	setTimeout(()=>{
		flipCard(this);
	}, onTime);
	flipCard(this);
	await timer(onTime);
	unlock(this);
	if(currPointer == cards.length){
		checkRecord(cards.length);
		currPointer = 0;
		for(let i = 0; i<cardList.length; i+=1){
			const cardElement = cardList[i]; 
			lock(cardElement);
		}
		await timer(delayTime);
		playCards();
	}
}

/**
 * @description
 * Basic function to lock the element from user input
 * @func lock
 * @param {Object} element
 */
//lock element from user input
function lock(element){
	element.removeEventListener("click", checkClicked, false);
}

//allow element to be clicked again, runs checkClicked when pressed
/**
 * @description
 * Basic function to unlock the element from user input
 * @func unlock
 * @param {Object} element 
 */
function unlock(element){
	element.addEventListener("click", checkClicked);
}

/**
 * @description
 * Checks the if the new level beats the current record and updates the html appropriately
 * @func checkRecord
 * @param {number} val
 */
//when the game ends, or when a new card is added to the sequence, this updates the Level and Record divs appropriately
function checkRecord(val){
	const statsGrid = document.getElementById("stats-grid");
	const stats = statsGrid.querySelectorAll("p");
	stats[0].innerHTML = `Level - ${val}`;
	if(val > record){
		record = val;
		stats[1].innerHTML = `Record - ${val}`;
	}
}

/**
 * @description
 * Saves the new score to localStorage, and locks all elements, then resets the cards and the sequence array and navigates to result-sequence.html file.
 * @func endGame
 */
//called when game ends; locks every element, resets everything, and unhides the play button, but with a different text
function endGame(){
	const recordToSave = { difficulty: selectedDifficulty, level: cards.length - 1 };
	let history = JSON.parse(localStorage.getItem("sequence")) || [];
	history.push(recordToSave);
	localStorage.setItem("sequence", JSON.stringify(history));

	localStorage.setItem("sequence-recent", JSON.stringify(recordToSave));

	for(let i = 0; i<cardList.length; i+=1){
		const cardElement = cardList[i]; 
		lock(cardElement);
	}
	cards = [];
	cardList = [];
	document.getElementById("difficulty-btn").disabled = false;

	window.location.href = "result-sequence.html";
}

/**
 * @description
 * Flips the card by changing the card class between unflipped and flipped
 * @func flipCard
 * @param {Object} card
 */
//basic card flip animation; toggles the background color to change
function flipCard(card){
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
function loadRecords() {
	const statsGrid = document.getElementById("stats-grid");
	const stats = statsGrid.querySelectorAll("p");

	const records = JSON.parse(localStorage.getItem("sequence")) || [];
	const filteredRecords = records.filter((record) => record.difficulty === selectedDifficulty);
	if (filteredRecords.length > 0) {
		const sortedLevels = filteredRecords
			.map((record) => record.level)
			.sort((a, b) => b - a);
			
		record = sortedLevels[0];
		stats[1].innerHTML = `Record - ${record}`;
	} else {
		record = 0;
		stats[1].innerHTML = `Record - 0`;
	}
}
