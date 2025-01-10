import Deck from "./deck.js";
import Player from "./player.js";
import Dealer from "./dealer.js";

export default class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player("Olivia");
    this.dealer = new Dealer();
    this.isGameOver = false;
    this.message = "";
    this.isDealerTurn = false;
  }

  initialiseGame() {
    this.deck = new Deck();
    this.deck.shuffleDeck();
    this.player.hand.resetHand();
    this.dealer.hand.resetHand();
    this.isGameOver = false;
    this.message = "";
    this.isDealerTurn = false;
  }

  dealInitialCards() {
    this.player.hand.addCard(this.deck.drawCard());
    this.player.hand.addCard(this.deck.drawCard());
    this.dealer.hand.addCard(this.deck.drawCard());
    this.dealer.hand.addCard(this.deck.drawCard());
  }

  startGame() {
    this.initialiseGame();
    this.dealInitialCards();
    if (this.player.hand.hasBlackjack()) {
      this.endGame("Player has Blackjack! Player Wins!");
    } else if (this.dealer.hand.hasBlackjack()) {
      this.endGame("Dealer has Blackjack! Dealer Wins!");
    }
  }

  playerTurn(action) {
    if (action === "hit") {
      this.player.hand.addCard(this.deck.drawCard());
      if (this.player.hand.isBust()) {
        this.endGame("Player Busts. Dealer Wins!");
      }
    } else if (action === "stand") {
      this.dealerTurn();
    } else {
      console.log("Invalid action. Use 'hit' or 'stand'.");
    }
  }

  dealerTurn() {
    this.isDealerTurn = true;
    this.dealer.playTurn(this.deck);
    if (this.dealer.hand.isBust()) {
      this.endGame("Dealer Busts. Player Wins!");
    } else {
      this.determineWinner();
    }
  }

  determineWinner() {
    const playerHandValue = this.player.hand.getHandValue();
    const dealerHandValue = this.dealer.hand.getHandValue();

    if (playerHandValue > dealerHandValue) {
      this.endGame("Player Wins!");
    } else if (dealerHandValue > playerHandValue) {
      this.endGame("Dealer Wins!");
    } else {
      this.endGame("It's a Tie!");
    }
  }

  endGame(message) {
    this.isGameOver = true;
    this.message = message;
    this.isDealerTurn = true;
  }
}
