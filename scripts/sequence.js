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

let cardList = [];
let cards = [];
let currPointer = 0;
let record = 0;
const timer = ms => new Promise(res => setTimeout(res, ms));

function initializeCardList(){
	const playButton = document.getElementById("start-btn");
	cards = [];
	cardList = [];
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

function appendRandom(array){
	array.push(Math.floor(Math.random() * 8));
}


async function playCards(){
	appendRandom(cards);
	for(let j = 0; j<cards.length; j+=1){
		const cardElement = cardList[cards[j]];
		cardElement.removeEventListener("click", checkClicked, false);
		cardElement.classList.add("unflipped");
		flipCard(cardElement);
		setTimeout(()=>{
			flipCard(cardElement);
		}, 400);
		await timer(1000);
	}
	for(let i = 0; i<cardList.length; i+=1){
		const cardElement = cardList[i]; 
		cardElement.addEventListener("click", checkClicked);
	}
}

async function checkClicked(){
	this.classList.add("unflipped");
	if(this != cardList[cards[currPointer]]){
		endGame();
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
	
	if(currPointer == cards.length){
		checkRecord(cards.length);
		currPointer = 0;
		await timer(1000);
		playCards();
	}
}

function checkRecord(val){
	const statsGrid = document.getElementById("stats-grid");
	const stats = statsGrid.querySelectorAll("p");
	stats[0].innerHTML = `Level - ${val}`;
	if(val > record){
		record = val;
		stats[1].innerHTML = `Record - ${val}`;
	}
}

function endGame(){
	for(let i = 0; i<cardList.length; i+=1){
		const cardElement = cardList[i]; 
		cardElement.removeEventListener("click", checkClicked, false);
	}
	const playButton = document.getElementById("start-btn");
	playButton.style.display = "block";
	playButton.innerHTML = "You Lost! Try again";
}

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
