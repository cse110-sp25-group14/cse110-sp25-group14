window.addEventListener("DOMContentLoaded", init);

//initialize board
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	initializeCardList();
	playCards();
};

let cardList = [];
function initializeCardList(){
	const grid = document.getElementById("card-grid");
	const rows = grid.getElementsByClassName("card-row");
	for(let i = 0; i<rows.length; i+=1){
		const cardArr = rows[i].getElementsByClassName("card");
		for(let j = 0; j<cardArr.length; j+=1){
			const cardElement = cardArr[j];
			cardList.push(cardElement);
		}
	}
}

let cards = [];

function appendRandom(array){
	array.push(Math.floor(Math.random() * 8));
}

const timer = ms => new Promise(res => setTimeout(res, ms));


async function playCards(){
	appendRandom(cards);
	for(let j = 0; j<cards.length; j+=1){
		const cardElement = cardList[cards[j]];
		cardElement.classList.add("unflipped");
		setTimeout(()=>{
			flipCard(cardElement);
		}, 500);
		flipCard(cardElement);
		await timer(1000);
	}
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
