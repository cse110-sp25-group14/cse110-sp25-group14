const cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"]; // can expand
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const grid = document.getElementById("card-grid")
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
  /*cards.forEach(number => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.letter = number;
    card.textContent = ""; // hidden initially
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });*/
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("matched")) return;
  const image = this.querySelector("img");
  image.src = `./assets/matching${this.dataset.number}.png`;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.number === secondCard.dataset.number) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
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

window.addEventListener('DOMContentLoaded', init);

async function init() {
  createBoard();
}
