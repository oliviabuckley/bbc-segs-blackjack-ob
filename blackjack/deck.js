import Card from "./card.js";

export default class Deck {
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
      "jack",
      "queen",
      "king",
      "ace",
    ];
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    let deck = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(new Card(rank, suit));
      }
    }
    return deck;
  }
  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  drawCard() {
    return this.cards.pop();
  }
  resetDeck() {
    this.cards = this.createDeck();
  }
  isEmpty() {
    return this.cards.length === 0;
  }
  cardsRemaining() {
    return this.cards.length;
  }
}
