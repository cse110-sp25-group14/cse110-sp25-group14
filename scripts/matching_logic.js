const cards = ["A", "A", "B", "B", "C", "C", "D", "D"]; // can expand
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById("gameBoard");
  shuffle(cards);
  cards.forEach(letter => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.letter = letter;
    card.textContent = ""; // hidden initially
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

  this.textContent = this.dataset.letter;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.letter === secondCard.dataset.letter) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
