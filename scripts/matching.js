//wait for all elements to load before starting up
window.addEventListener("DOMContentLoaded", init);

//initialize board
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	createBoard();
	startStopwatch();
}

//initialize cards to match, can use numbers or file names
const cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"]; // can expand
let firstCard = null;
let secondCard = null;
let lockBoard = false;

//shuffle cards
export function shuffle(array) {
	array.sort(() => 0.5 - Math.random());
}

let startTime = null;
let stopwatchInterval = null;

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
	clearInterval(stopwatchInterval);
}


//appends the value of each card hidden to user
function createBoard() {
	const grid = document.getElementById("card-grid");
	const rows = grid.getElementsByClassName("card-row");
	shuffle(cards);
	for(let i = 0; i<rows.length; i+=1){
		const cardArr = rows[i].getElementsByClassName("card");
		for(let j = 0; j<cardArr.length; j+=1){
			const cardElement = cardArr[j];
			cardElement.dataset.number = cards[j+i*rows.length];
			cardElement.addEventListener("click", flipCard);
		}
	}
}

//flips card and changes the img src, then checks if it matches with the first card if it is the second card
function flipCard() {
	if (lockBoard || this === firstCard || this.classList.contains("matched")) return;
	const image = this.querySelector("img");
	image.src = `./assets/matching${this.dataset.number}.svg`;
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
	if (firstCard.dataset.number === secondCard.dataset.number) {
		firstCard.classList.add("matched");
		secondCard.classList.add("matched");
		resetBoard();

		const matchedCards = document.querySelectorAll(".matched").length;
		if (matchedCards === cards.length){
			stopStopwatch();
			alert("You Suck !");
		}

	} else {
		lockBoard = true;
		setTimeout(() => {
			firstCard.querySelector("img").src = "./assets/G14.png";
			secondCard.querySelector("img").src = "./assets/G14.png";
			firstCard.classList.remove("flipped");
			secondCard.classList.remove("flipped");
			resetBoard();
		}, 500);
	}
}

function resetBoard() {
	[firstCard, secondCard, lockBoard] = [null, null, false];
}

