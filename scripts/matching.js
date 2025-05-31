//wait for all elements to load before starting up
window.addEventListener("DOMContentLoaded", init);
let moves = 0;
let bestMoves = Infinity;
let bestTime  = Infinity;

//initialize board
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	const playButton = document.getElementById("start-btn");
	playButton.addEventListener("click", createBoard);
}

//initialize cards to match, can use numbers or file names
const cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"]; // can expand
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let startTime = null;
let stopwatchInterval = null;

//shuffle cards
export function shuffle(array) {
	array.sort(() => 0.5 - Math.random());
}


//starts stopwatch
function startStopwatch() {
	startTime = Date.now();
	stopwatchInterval = setInterval(() => {
		const elapsedTime = Date.now() - startTime;
		const seconds = Math.floor(elapsedTime / 1000);
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;

		document.getElementById("stopwatch").textContent = 
		`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	}, 1000);
}

function stopStopwatch(){
	//save time if it beats record
	clearInterval(stopwatchInterval);
}


//appends the value of each card hidden to user
function createBoard() {
	moves = 0;
	document.getElementById("move-counter").textContent = "Moves - 0";
	hideButton();
	unflipAll();
	startStopwatch();
	const grid = document.getElementById("card-grid");
	const rows = grid.getElementsByClassName("card-row");
	shuffle(cards);
	for(let i = 0; i<rows.length; i+=1){
		const cardArr = rows[i].getElementsByClassName("card");
		for(let j = 0; j<cardArr.length; j+=1){
			const cardElement = cardArr[j];
			cardElement.dataset.number = cards[j+i*rows.length];
			cardElement.addEventListener("click", flipCard);
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
function unflipAll(){
	const cardArr = document.getElementsByClassName("card");
	for(let i = 0; i<cardArr.length; i+=1){
		cardArr[i].className = "card";
		cardArr[i].src = "./assets/G14.png";
	}
}

//hides play button (this function is temporary; will change once frontend has result and start implemented)
function hideButton(){
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "none";
}

//flips card and changes the img src, then checks if it matches with the first card if it is the second card
function flipCard() {
	if (lockBoard || this === firstCard || this.classList.contains("matched")) return;
	this.src = `./assets/matching${this.dataset.number}.svg`;
	this.classList.add("flipped");
	if (!firstCard) {
		firstCard = this;
	} else {
		secondCard = this;
		checkMatch();
	}
}

//checks if the two cards match, and updates the data of the cards if they do
function checkMatch() {

	moves += 1;
	document.getElementById("move-counter").textContent = `Moves - ${moves}`;

	if (firstCard.dataset.number === secondCard.dataset.number) {
		firstCard.classList.add("matched");
		secondCard.classList.add("matched");
		resetBoard();

		const matchedCards = document.querySelectorAll(".matched").length;
		if (matchedCards === cards.length){
			stopStopwatch();
			setTimeout(() =>{
				endGame();
			}, 200);
			return;
		}

	} else {
		lockBoard = true;
		setTimeout(() => {
			firstCard.src = "./assets/G14.png";
			secondCard.src = "./assets/G14.png";
			firstCard.classList.remove("flipped");
			secondCard.classList.remove("flipped");
			resetBoard();
		}, 500);
	}
}


//resets values every time match occurs
function resetBoard() {
	[firstCard, secondCard, lockBoard] = [null, null, false];
}

//stop the stopwatch before calling endGame
function endGame(){

	const elapsedTime = Date.now() - startTime;

	if (moves < bestMoves) {
		bestMoves = moves;
		document.getElementById("record-moves").textContent =
		`Record Moves - ${bestMoves}`;
	}

	if (elapsedTime < bestTime) {
		bestTime = elapsedTime;
		const totalSec = Math.floor(bestTime / 1000);
		const mins     = Math.floor(totalSec / 60);
		const secs     = totalSec % 60;
		document.getElementById("record-time").textContent =
		`Record Time - ${mins.toString().padStart(2,"0")}:${secs
			.toString().padStart(2,"0")}`;
	}

	resetBoard();
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "block";
	playButton.addEventListener("click", createBoard);
}
