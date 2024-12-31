import Card from "../blackjack/card.js";

describe("Card", () => {
  describe("getCardValue", () => {
    test("return the correct value for numeral cards", () => {
      const card2 = new Card("2", "Hearts");
      const card5 = new Card("5", "Clubs");
      const card10 = new Card("10", "Spades");
      expect(card2.getCardValue()).toBe(2);
      expect(card5.getCardValue()).toBe(5);
      expect(card10.getCardValue()).toBe(10);
    });
    test("return 10 for face cards", () => {
      const jack = new Card("Jack", "Diamonds");
      const queen = new Card("Queen", "Clubs");
      const king = new Card("King", "Spades");
      expect(jack.getCardValue()).toBe(10);
      expect(queen.getCardValue()).toBe(10);
      expect(king.getCardValue()).toBe(10);
    });
    test("return 11 for aces by default", () => {
      const ace = new Card("Ace", "Hearts");
      expect(ace.getCardValue()).toBe(11);
    });
  });
  describe("getImage", () => {
    test("return the correct image path for number cards", () => {
      const card = new Card("2", "Hearts");
      expect(card.getImage()).toBe("images/2_of_hearts.png");
    });
    test("return the correct image path face cards", () => {
      const card = new Card("King", "Spades");
      expect(card.getImage()).toBe("images/king_of_spades.png");
    });
    test("handle rank and suit case insensitivity correctly", () => {
      const card = new Card("ace", "hearts");
      expect(card.getImage()).toBe("images/ace_of_hearts.png");
    });
    test("return correct image path when rank or suit has different casing", () => {
      const card = new Card("10", "hearts");
      expect(card.getImage()).toBe("images/10_of_hearts.png");
    });
  });
});
