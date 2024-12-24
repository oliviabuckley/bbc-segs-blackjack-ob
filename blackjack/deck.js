const Card = require("./card");

class Deck {
  constructor() {
    this.cards = this.createDeck();
  }
  createDeck() {
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    let deck = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(new Card(rank, suit));
      }
    }
    return deck;
  }
}

module.exports = Deck;
