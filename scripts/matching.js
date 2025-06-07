export class MatchingGame {
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
	}

	//initialize board
	init() {
		const backButton = document.getElementById("page-info");
		backButton.querySelector("img").addEventListener("click", ()=>{
			window.location.href = "homepage.html";
		});
		const playButton = document.getElementById("start-btn");
		playButton.addEventListener("click", this.createBoard.bind(this));

		if (localStorage.getItem("darkMode") === "enabled") {
			document.body.classList.add("dark");
		}

		const darkmodeToggle = document.getElementById('theme-toggle');
		darkmodeToggle.addEventListener("click", ()=>{
			document.body.classList.toggle("dark");
			const isDarkmode = document.body.classList.contains("dark");
			localStorage.setItem("darkMode", isDarkmode ? "enabled" : "disabled");
		});

		this.loadRecords();
	}

	//shuffle cards
	shuffle(array) {
		array.sort(() => 0.5 - Math.random());
	}

	//starts stopwatch
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

	stopStopwatch(){
		//save time if it beats record
		clearInterval(this.stopwatchInterval);
	}

	//appends the value of each card hidden to user
	createBoard() {
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

	//unflips all cards when game resets
	unflipAll(){
		const cardArr = document.getElementsByClassName("card");
		for(let i = 0; i<cardArr.length; i+=1){
			cardArr[i].className = "card";
			cardArr[i].src = "../assets/G14.png";
		}
	}

	//hides play button (this function is temporary; will change once frontend has result and start implemented)
	hideButton(){
		const playButton = document.getElementById("start-btn");
		playButton.style.display = "none";
	}

	//flips card and changes the img src, then checks if it matches with the first card if it is the second card
	flipCard(event) {
		const card = event.currentTarget;
		if (this.lockBoard || card === this.firstCard || card.classList.contains("matched")) return;
		card.src = `../assets/matching${card.dataset.number}.svg`;
		card.classList.add("flipped");
		if (!this.firstCard) {
			this.firstCard = card;
		} else {
			this.secondCard = card;
			this.checkMatch();
		}
	}

	//checks if the two cards match, and updates the data of the cards if they do
	checkMatch() {

		this.moves += 1;
		document.getElementById("move-counter").textContent = `Moves - ${this.moves}`;

		if (this.firstCard.dataset.number === this.secondCard.dataset.number) {
			this.firstCard.classList.add("matched");
			this.secondCard.classList.add("matched");
			this.resetBoard();

			const matchedCards = document.querySelectorAll(".matched").length;
			if (matchedCards === this.cards.length){
				setTimeout(() =>{
					this.stopStopwatch();
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

	//resets values every time match occurs
	resetBoard() {
		[this.firstCard, this.secondCard, this.lockBoard] = [null, null, false];
	}

	//stop the stopwatch before calling endGame
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
	}

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
