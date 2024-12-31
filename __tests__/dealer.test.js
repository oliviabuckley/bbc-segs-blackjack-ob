import Dealer from "../blackjack/dealer.js";
import Card from "../blackjack/card.js";
import Deck from "../blackjack/deck.js";

describe("Dealer", () => {
  test("initialise with a name and an empty hand", () => {
    const dealer = new Dealer();
    expect(dealer.hand.cards.length).toBe(0);
  });
  describe("playTurn", () => {
    test("dealer draws cards until hand value is at least 17", () => {
      const dealer = new Dealer();
      const deck = new Deck();
      dealer.hand.addCard(new Card("5", "Hearts"));
      dealer.hand.addCard(new Card("6", "Clubs"));
      dealer.playTurn(deck);
      expect(dealer.hand.getHandValue()).toBeGreaterThanOrEqual(17);
    });
    test("dealer does not draw cards if hand value is already 17 or more", () => {
      const dealer = new Dealer();
      const deck = new Deck();
      dealer.hand.addCard(new Card("10", "Spades"));
      dealer.hand.addCard(new Card("7", "Hearts"));
      dealer.playTurn(deck);
      expect(dealer.hand.getHandValue()).toBe(17);
    });
  });
});
