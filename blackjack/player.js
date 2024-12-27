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
}

module.exports = Player;
