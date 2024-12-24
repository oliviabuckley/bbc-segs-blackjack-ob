class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
  getValue() {
    if (this.rank === "Ace") return 11;
    if (["Jack", "Queen", "King"].includes(this.rank)) return 10;
    return parseInt(this.rank);
  }
}

const card = new Card("Queen", "Clubs");

console.log(card.getValue());

module.exports = Card;
