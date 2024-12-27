const Deck = require("./deck");
const Player = require("./player");
const Dealer = require("./dealer");

class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
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
  }
}

const game = new Game();

console.log(game.startGame());

module.exports = Game;
