import Game from "./game.js";
import Player from "./player.js";

const game = new Game();
document.getElementById("instructions").style.display = "block";

document.getElementById("start-button").addEventListener("click", () => {
  const playerName = document.getElementById("player-name").value;

  if (playerName.trim()) {
    game.player = new Player(playerName);
    document.getElementById("name-input-container").style.display = "none";
    game.startGame();
    document.getElementById("start-button").disabled = true;

    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("instructions").style.display = "block";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("play-again-button").style.display = "none";
    document.getElementById("player-hand").style.display = "block";
    document.getElementById("dealer-hand").style.display = "block";
    updateGameUI();
  } else {
    alert("Please enter a name to start the game.");
  }
});

document.getElementById("hit-button").addEventListener("click", () => {
  game.playerTurn("hit");
  updateGameUI();
});

document.getElementById("stand-button").addEventListener("click", () => {
  game.playerTurn("stand");
  updateGameUI();
});

document.getElementById("play-again-button").addEventListener("click", () => {
  game.startGame();
  document.getElementById("start-button").disabled = true;
  document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
  document.getElementById("play-again-button").style.display = "none";
  updateGameUI();
});

function updateGameUI() {
  document.getElementById(
    "player-hand"
  ).innerHTML = `${game.player.name}'s hand: `;
  document.getElementById("dealer-hand").innerHTML = "Dealer's hand: ";

  game.player.hand.cards.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.getImage();
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add("card-image");
    document.getElementById("player-hand").appendChild(img);
  });

  game.dealer.hand.cards.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.getImage();
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add("card-image");
    document.getElementById("dealer-hand").appendChild(img);
  });

  document.getElementById("game-message").textContent = game.message;

  if (game.isGameOver) {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("play-again-button").style.display = "inline";
  }
}
