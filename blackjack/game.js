const Deck = require("./deck");
const Player = require("./player");
const Dealer = require("./dealer");
const readline = require("readline");

class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.gameOver = false;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  startGame() {
    this.deck.shuffleDeck();
    this.dealer.clearHand();
    this.player.clearHand();
    this.player.addCard(this.deck.drawCard());
    this.player.addCard(this.deck.drawCard());
    this.dealer.addCard(this.deck.drawCard());
    this.dealer.addCard(this.deck.drawCard());
    console.log("Game Started");
    console.log("Player's Hand: " + this.player.showHand());
    console.log("Dealer's Hand: " + this.dealer.showHand());
    if (this.player.hasBlackjack()) {
      this.gameOver = true;
      console.log("Player has Blackjack! Player Wins!");
      this.rl.close();
    } else if (this.dealer.hasBlackjack()) {
      this.gameOver = true;
      console.log("Dealer has Blackjack! Dealer Wins!");
      this.rl.close();
    } else {
      this.promptPlayer();
    }
  }
  promptPlayer() {
    if (this.gameOver) return;
    this.rl.question("Do you want to 'hit' or 'stand'? ", (action) => {
      if (action === "hit") {
        this.playerTurn(action);
      } else if (action === "stand") {
        this.playerTurn(action);
      } else {
        console.log("Invalid choice. Please choose 'hit' or 'stand'.");
        this.promptPlayer();
      }
    });
  }
  playerTurn(action) {
    if (this.gameOver) return;
    if (action === "hit") {
      this.player.addCard(this.deck.drawCard());
      console.log("Player's Hand: " + this.player.showHand());
      if (this.player.isBusted()) {
        this.gameOver = true;
        console.log("Player Busts");
        this.rl.close();
        return;
      }
      console.log("Player Hits");
      this.promptPlayer();
    } else if (action === "stand") {
      console.log("Player's Hand: " + this.player.showHand());
      console.log("Player Stands");
      this.dealerTurn();
    }
  }
  dealerTurn() {
    if (this.gameOver) return;
    this.dealer.playTurn(this.deck);
    console.log("Dealer's Hand: " + this.dealer.showHand());
    if (this.dealer.isBusted()) {
      this.gameOver = true;
      console.log("Dealer Busts");
      this.rl.close();
      return;
    }
    console.log("Dealer Stands");
    this.determineWinner();
  }
  determineWinner() {
    const playerHandValue = this.player.hand.getHandValue();
    const dealerHandValue = this.dealer.hand.getHandValue();
    console.log("Player's Hand Value: " + playerHandValue);
    console.log("Dealer's Hand Value: " + dealerHandValue);

    if (playerHandValue > 21) {
      console.log("Dealer Wins (Player Busts)");
    } else if (dealerHandValue > 21) {
      console.log("Player Wins (Dealer Busts)");
    } else if (playerHandValue > dealerHandValue) {
      console.log("Player Wins");
    } else if (dealerHandValue > playerHandValue) {
      console.log("Dealer Wins");
    } else {
      console.log("It's a Tie");
    }
    this.rl.close();
  }
}

const game = new Game();
game.startGame();
module.exports = Game;
