const Card = require("../blackjack/card");

describe("Card", () => {
  describe("getValue", () => {
    test("return the correct value for numeral cards", () => {
      const card2 = new Card("2", "Hearts");
      const card5 = new Card("5", "Clubs");
      const card10 = new Card("10", "Spades");
      expect(card2.getValue()).toBe(2);
      expect(card5.getValue()).toBe(5);
      expect(card10.getValue()).toBe(10);
    });
    test("return 10 for face cards", () => {
      const jack = new Card("Jack", "Diamonds");
      const queen = new Card("Queen", "Clubs");
      const king = new Card("King", "Spades");
      expect(jack.getValue()).toBe(10);
      expect(queen.getValue()).toBe(10);
      expect(king.getValue()).toBe(10);
    });
    test("return 11 for aces by default", () => {
      const ace = new Card("Ace", "Hearts");
      expect(ace.getValue()).toBe(11);
    });
  });
});
