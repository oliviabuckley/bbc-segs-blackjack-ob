import Game from "./game.js";

const game = new Game();

document.getElementById("start-button").addEventListener("click", () => {
  game.startGame();
  document.getElementById("start-button").disabled = true;
  document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
  updateGameUI();
});

document.getElementById("hit-button").addEventListener("click", () => {
  game.playerTurn("hit");
  updateGameUI();
});

document.getElementById("stand-button").addEventListener("click", () => {
  game.playerTurn("stand");
  updateGameUI();
});

function updateGameUI() {
  document.getElementById(
    "player-hand"
  ).textContent = `Your hand: ${game.player.hand.showHand()} (Value: ${game.player.hand.getHandValue()})`;
  document.getElementById(
    "dealer-hand"
  ).textContent = `Dealer's hand: ${game.dealer.hand.showHand()} (Value: ${game.dealer.hand.getHandValue()})`;

  document.getElementById("game-message").textContent = game.message;

  if (game.isGameOver) {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
  }
}
