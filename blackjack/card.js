export default class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
  getCardValue() {
    if (this.rank === "ace") return 11;
    if (["jack", "queen", "king"].includes(this.rank)) return 10;
    return parseInt(this.rank);
  }
  getImage() {
    return `images/${this.rank}_of_${this.suit}.png`;
  }
}
