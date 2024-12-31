export default class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
  getCardValue() {
    if (this.rank === "Ace") return 11;
    if (["Jack", "Queen", "King"].includes(this.rank)) return 10;
    return parseInt(this.rank);
  }
  getImage() {
    const suitNames = {
      Hearts: "hearts",
      Diamonds: "diamonds",
      Clubs: "clubs",
      Spades: "spades",
    };
    const rankNames = {
      Ace: "ace",
      Jack: "jack",
      Queen: "queen",
      King: "king",
    };
    const formattedRank = rankNames[this.rank] || this.rank.toLowerCase();
    const formattedSuit = suitNames[this.suit] || this.suit.toLowerCase();

    const imageName = `${formattedRank}_of_${formattedSuit}.png`;
    return `images/${imageName}`;
  }
}
