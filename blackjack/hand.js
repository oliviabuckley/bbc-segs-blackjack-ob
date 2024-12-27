const Card = require("./card");

class Hand {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    if (card instanceof Card) {
      this.cards.push(card);
    }
  }
  getHandValue() {
    let totalValue = 0;
    let aceCount = 0;
    this.cards.forEach((card) => {
      totalValue += card.getValue();
      if (card.rank === "Ace") aceCount++;
    });
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    return totalValue;
  }
  isBust() {
    return this.getHandValue() > 21;
  }
  hasBlackjack() {
    return this.cards.length === 2 && this.getHandValue() === 21;
  }
  resetHand() {
    this.cards = [];
  }
}

module.exports = Hand;