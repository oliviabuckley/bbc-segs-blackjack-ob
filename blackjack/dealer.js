const Card = require("./card");
const Hand = require("./hand");

class Dealer {
  constructor() {
    this.hand = new Hand();
  }
  addCard(card) {
    if (card instanceof Card) {
      this.hand.addCard(card);
    }
  }
  hasBlackjack() {
    return this.hand.hasBlackjack();
  }
  isBusted() {
    return this.hand.getHandValue() > 21;
  }
  showHand() {
    return this.hand.showHand();
  }
  clearHand() {
    this.hand = new Hand();
  }
  playTurn(deck) {
    while (this.hand.getHandValue() < 17) {
      this.addCard(deck.drawCard());
    }
  }
}

module.exports = Dealer;
