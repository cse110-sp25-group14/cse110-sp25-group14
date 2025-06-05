window.addEventListener("DOMContentLoaded", init);

//initialize board
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
		generateGrid(); //re-generate grid on click, so toggled difficulty can be visualized 
	});

	//set initial difficulty as well as dynamic button text and apply difficulty mods
	setDifficulties();
	updateDifficultyText();
	generateGrid();  //on page load add base grid 
};

//initialize variables; cardList is the list of cards on the page, cards is the list of current cards in the user's sequence listed by index, currPointer is what card the user is on in their sequence, record stores the user's current record
let cardList = [];
let cards = [];
let currPointer = 0;
let record = 0;
let onTime = 400;
let delayTime = 500;
let selectedDifficulty = "easy";
let gridSize = 3;
let cardsInPlay = 9;

//to pull values for dynamic text on difficulty button
const difficultyLabels = {
	easy: "Easy",
	medium: "Medium",
	hard: "Hard"
};

//timer is a promise that returns when the timeout ends
const timer = ms => new Promise(res => setTimeout(res, ms));

//need to build dyanmically per click and on load so let's pull out the code that is inside initializeCardList that does that
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


//initialize cards; first make play button go away, then push all cardElements in the page into the cardList array (cardList array doesn't change after this, it is only referenced), then runs playCards
function initializeCardList(){
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

//appends a random number in the current number of cards that are in play (diff-based) to the array, which are the indices of cardList
function appendRandom(array){
	array.push(Math.floor(Math.random() * cardsInPlay));
}

//since button is a toggle we want to make sure that click on easy moves it to medium
//and clicking medium takes it to hard and repeats that loop
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

function updateDifficultyText() {
	const button = document.getElementById("difficulty-btn");
	button.querySelector("span").textContent = `Difficulty: ${difficultyLabels[selectedDifficulty]}`;
}

//async function, since timeouts are used extensively for better user experience. code adds one extra card to the current user sequence, then shows all of the current cards in order (user buttons should be locked before this call). it will then unlock every card on the page
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

//lock element from user input
function lock(element){
	element.removeEventListener("click", checkClicked, false);
}

//allow element to be clicked again, runs checkClicked when pressed
function unlock(element){
	element.addEventListener("click", checkClicked);
}

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

//called when game ends; locks every element, resets everything, and unhides the play button, but with a different text
function endGame(){
	for(let i = 0; i<cardList.length; i+=1){
		const cardElement = cardList[i]; 
		lock(cardElement);
	}
	cards = [];
	cardList = [];
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "block";
	playButton.innerHTML = "You Lost! Try again";
}

//basic card flip animation; toggles the background color to change
function flipCard(card){
	if(card.classList.contains("unflipped")){
		card.style.backgroundColor = "purple";
		card.classList.add("flipped");
		card.classList.remove("unflipped");
	}
	else{
		card.style.backgroundColor = "#BFE9E7";
		card.classList.add("unflipped");
		card.classList.remove("flipped");
	}
}
