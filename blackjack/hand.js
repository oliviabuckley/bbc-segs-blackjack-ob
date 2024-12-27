const Card = require("./card");
const Deck = require("./deck");

class Hand {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
}

module.exports = Hand;
