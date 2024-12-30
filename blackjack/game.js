const Deck = require("./deck");
const Player = require("./player");
const Dealer = require("./dealer");

class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player("Olivia");
    this.dealer = new Dealer();
    this.gameOver = false;
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
    } else if (this.dealer.hasBlackjack()) {
      this.gameOver = true;
      console.log("Dealer has Blackjack! Dealer Wins!");
    }
  }
  playerTurn(action) {
    if (this.gameOver) return;
    if (action === "hit") {
      this.player.addCard(this.deck.drawCard());
      if (this.player.isBusted()) {
        this.gameOver = true;
        return "Player Busts";
      }
      return "Player Hits";
    }
    if (action === "stand") {
      return "Player Stands";
    }
  }
  dealerTurn() {
    if (this.gameOver) return;
    this.dealer.playTurn(this.deck);
    if (this.dealer.isBusted()) {
      this.gameOver = true;
      return "Dealer Busts";
    }
    return "Dealer Finishes Turn";
  }
}

module.exports = Game;
