import Game from "./game.js";
import Player from "./player.js";

const startButton = document.getElementById("start-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const playAgainButton = document.getElementById("play-again-button");
const playerHandContainer = document.getElementById("player-hand");
const dealerHandContainer = document.getElementById("dealer-hand");
const gameMessage = document.getElementById("game-message");
const instructions = document.getElementById("instructions");
const nameInputContainer = document.getElementById("name-input-container");
const playerNameInput = document.getElementById("player-name");

const game = new Game();

instructions.style.display = "block";

startButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    game.player = new Player(playerName);
    nameInputContainer.style.display = "none";
    game.startGame();
    startButton.disabled = true;
    hitButton.classList.remove("hidden");
    standButton.classList.remove("hidden");
    hitButton.disabled = false;
    standButton.disabled = false;
    instructions.style.display = "none";
    playAgainButton.style.display = "none";
    playerHandContainer.style.display = "block";
    dealerHandContainer.style.display = "block";
    updateGameUI();
  } else {
    alert("Please enter a name to start the game.");
  }
});

hitButton.addEventListener("click", () => {
  game.playerTurn("hit");
  updateGameUI();
});

standButton.addEventListener("click", () => {
  game.playerTurn("stand");
  updateGameUI();
});

playAgainButton.addEventListener("click", () => {
  game.startGame();
  startButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  playAgainButton.style.display = "none";
  updateGameUI();
});

function updateGameUI() {
  const playerHandContainer = document.getElementById("player-hand");
  const dealerHandContainer = document.getElementById("dealer-hand");

  playerHandContainer.innerHTML = "";
  dealerHandContainer.innerHTML = "";

  const playerText = document.createElement("div");
  playerText.textContent = `${game.player.name}'s hand:`;
  playerText.classList.add("hand-title");
  playerHandContainer.appendChild(playerText);

  game.player.hand.cards.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.getImage();
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add("card-image");
    playerHandContainer.appendChild(img);
  });

  const dealerText = document.createElement("div");
  dealerText.textContent = "Dealer's hand:";
  dealerText.classList.add("hand-title");
  dealerHandContainer.appendChild(dealerText);

  game.dealer.hand.cards.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.getImage();
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add("card-image");
    dealerHandContainer.appendChild(img);
  });

  gameMessage.textContent = game.message;

  if (game.isGameOver) {
    hitButton.disabled = true;
    standButton.disabled = true;
    playAgainButton.style.display = "inline";
  }
}
