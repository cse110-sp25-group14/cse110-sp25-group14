window.addEventListener("DOMContentLoaded", init);

//initialize board
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	const playButton = document.getElementById("start-btn");
	playButton.addEventListener("click", initializeCardList);
};

//initialize variables; cardList is the list of cards on the page, cards is the list of current cards in the user's sequence listed by index, currPointer is what card the user is on in their sequence, record stores the user's current record
let cardList = [];
let cards = [];
let currPointer = 0;
let record = 0;

//timer is a promise that returns when the timeout ends
const timer = ms => new Promise(res => setTimeout(res, ms));

//initialize cards; first make play button go away, then push all cardElements in the page into the cardList array (cardList array doesn't change after this, it is only referenced), then runs playCards
function initializeCardList(){
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "none";
	currPointer = 0;
	const grid = document.getElementById("card-grid");
	const rows = grid.getElementsByClassName("card-row");
	for(let i = 0; i<rows.length; i+=1){
		const cardArr = rows[i].getElementsByClassName("card");
		for(let j = 0; j<cardArr.length; j+=1){
			const cardElement = cardArr[j];
			cardList.push(cardElement);
		}
	}
	playCards();
}

//appends a random number between 0-8 to the array, which are the indices of cardList
function appendRandom(array){
	array.push(Math.floor(Math.random() * 8));
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
		}, 400);
		await timer(500);
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
		}, 400);
		flipCard(this);
		return;
	}
	currPointer += 1;
	if(currPointer == cards.length){
		checkRecord(cards.length);
	}
	setTimeout(()=>{
		flipCard(this);
	}, 400);
	flipCard(this);
	await timer(400);
	unlock(this);
	if(currPointer == cards.length){
		checkRecord(cards.length);
		currPointer = 0;
		for(let i = 0; i<cardList.length; i+=1){
			const cardElement = cardList[i]; 
			lock(cardElement);
		}
		await timer(500);
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
	const recordToSave = { level: cards.length - 1 };
	let history = JSON.parse(localStorage.getItem("sequence")) || [];
	history.push(recordToSave);
	localStorage.setItem("sequence", JSON.stringify(history));

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
