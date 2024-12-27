const Hand = require("../blackjack/hand");
const Card = require("../blackjack/card");

describe("Hand", () => {
  test("initialise an empty hand", () => {
    const hand = new Hand();
    expect(hand.cards.length).toBe(0);
  });
  describe("addCard", () => {
    test("add a card to the hand", () => {
      const hand = new Hand();
      const card = new Card("7", "Diamonds");
      hand.addCard(card);
      expect(hand.cards.length).toBe(1);
      expect(hand.cards[0]).toBe(card);
    });
  });
});
