const Card = require("./card");
const Hand = require("./hand");

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
  }
  addCard(card) {
    if (card instanceof Card) {
      this.hand.addCard(card);
    }
  }
  getHand() {
    return this.hand;
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
}

module.exports = Player;
