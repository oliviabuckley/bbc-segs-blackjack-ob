import Hand from "./hand.js";

export default class Dealer {
  constructor() {
    this.hand = new Hand();
  }
  playTurn(deck) {
    while (this.hand.getHandValue() < 17) {
      this.hand.addCard(deck.drawCard());
    }
  }
}
