window.addEventListener("DOMContentLoaded", init);

//initialize board
function init() {
	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
	initializeCardList();
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
    playCards();
}

let cards = [];
let currPointer = 0;

function appendRandom(array){
	array.push(Math.floor(Math.random() * 8));
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function playCards(){
	appendRandom(cards);
	for(let j = 0; j<cards.length; j+=1){
		const cardElement = cardList[cards[j]];
        cardElement.removeEventListener("click", checkClicked, false);
		cardElement.classList.add("unflipped");
        flipCard(cardElement);
		setTimeout(()=>{
			flipCard(cardElement);
		}, 500);
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
	    }, 500);
	    flipCard(this);
        return;
    }
	setTimeout(()=>{
		flipCard(this);
	}, 500);
	flipCard(this);
	await timer(500);
    
    currPointer += 1;
    if(currPointer == cards.length){
        currPointer = 0;
        playCards();
    }
}

function endGame(){
    for(let i = 0; i<cardList.length; i+=1){
       	const cardElement = cardList[i]; 
        cardElement.removeEventListener("click", checkClicked, false);
    }
    console.log("game end");
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
