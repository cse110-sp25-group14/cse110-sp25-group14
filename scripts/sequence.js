export class SequenceGame {
	constructor() {
		//initialize variables; cardList is the list of cards on the page, cards is the list of current cards in the user's sequence listed by index, currPointer is what card the user is on in their sequence, record stores the user's current record
		this.cardList = [];
		this.cards = [];
		this.currPointer = 0;
		this.record = 0;
		this.onTime = 400;
		this.delayTime = 500;
		this.selectedDifficulty = "easy";
		this.gridSize = 3;
		this.cardsInPlay = 9;

		//to pull values for dynamic text on difficulty button
		this.difficultyLabels = {
			easy: "Easy",
			medium: "Medium",
			hard: "Hard"
		};

		//timer is a promise that returns when the timeout ends
		this.timer = ms => new Promise(res => setTimeout(res, ms));
	}

	//initialize board
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

	//need to build dyanmically per click and on load so let's pull out the code that is inside initializeCardList that does that
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

	//initialize cards; first make play button go away, then push all cardElements in the page into the cardList array (cardList array doesn't change after this, it is only referenced), then runs playCards
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

	//appends a random number in the current number of cards that are in play (diff-based) to the array, which are the indices of cardList
	appendRandom(array){
		array.push(Math.floor(Math.random() * this.cardsInPlay));
	}

	//since button is a toggle we want to make sure that click on easy moves it to medium
	//and clicking medium takes it to hard and repeats that loop
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

	//set the actual values that increase our idea of difficulty
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

	updateDifficultyText() {
		const button = document.getElementById("difficulty-btn");
		button.querySelector("span").textContent = 
			`Difficulty: ${this.difficultyLabels[this.selectedDifficulty]}`;
	}

	//async function, since timeouts are used extensively for better user experience. code adds one extra card to the current user sequence, then shows all of the current cards in order (user buttons should be locked before this call). it will then unlock every card on the page
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

	//when element is pressed and unlocked, this function is ran; it locks the current element, ends the game instantly if it is incorrect, or displays animation, increases currPointer, and checks if the user finished the sequence, which if they did, runs playCards again
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

	//lock element from user input
	lock(element){
		element.removeEventListener("click", this.boundCheckClicked, false);
	}

	//allow element to be clicked again, runs checkClicked when pressed
	unlock(element){
		element.addEventListener("click", this.boundCheckClicked);
	}

	//when the game ends, or when a new card is added to the sequence, this updates the Level and Record divs appropriately
	checkRecord(val){
		const statsGrid = document.getElementById("stats-grid");
		const stats = statsGrid.querySelectorAll("p");
		stats[0].innerHTML = `Level - ${val}`;
		if(val > this.record){
			this.record = val;
			stats[1].innerHTML = `Record - ${val}`;
		}
	}

	//called when game ends; locks every element, resets everything, and unhides the play button, but with a different text
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

	//basic card flip animation; toggles the background color to change
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
