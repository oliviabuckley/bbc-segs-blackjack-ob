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
  describe("getHandValue", () => {
    test("return 0 for an empty hand", () => {
      const hand = new Hand();
      expect(hand.getHandValue()).toBe(0);
    });
    test("return the correct value of cards in the hand", () => {
      const hand = new Hand();
      const card1 = new Card("3", "Clubs");
      const card2 = new Card("8", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.getHandValue()).toBe(11);
    });
    test("count Ace as 11 if total value is under 21", () => {
      const hand = new Hand();
      hand.addCard(new Card("Ace", "Spades"));
      hand.addCard(new Card("5", "Diamonds"));
      expect(hand.getHandValue()).toBe(16);
    });
    test("count Ace as 1 if total value is over 21", () => {
      const hand = new Hand();
      hand.addCard(new Card("Ace", "Spades"));
      hand.addCard(new Card("5", "Diamonds"));
      hand.addCard(new Card("10", "Clubs"));
      expect(hand.getHandValue()).toBe(16);
    });
    test("handle multiple Aces correctly", () => {
      const hand = new Hand();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("Ace", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.getHandValue()).toBe(12);
    });
  });
  describe("isBust", () => {
    test("return true if value of hand exceeds 21", () => {
      const hand = new Hand();
      const card1 = new Card("8", "Clubs");
      const card2 = new Card("10", "Diamonds");
      const card3 = new Card("9", "Spades");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      expect(hand.isBust()).toBe(true);
    });
    test("return false if value of hand does not exceed 21", () => {
      const hand = new Hand();
      const card1 = new Card("8", "Clubs");
      const card2 = new Card("10", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.isBust()).toBe(false);
    });
  });
  describe("hasBlackjack", () => {
    test("return true for a blackjack hand)", () => {
      const hand = new Hand();
      const card1 = new Card("Ace", "Clubs");
      const card2 = new Card("King", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.hasBlackjack()).toBe(true);
    });
    test("return false for a score of 21 from more than 2 cards", () => {
      const hand = new Hand();
      const card1 = new Card("10", "Clubs");
      const card2 = new Card("10", "Diamonds");
      const card3 = new Card("1", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      expect(hand.hasBlackjack()).toBe(false);
    });
  });
  describe("resetHand", () => {
    test("remove all cards from hand", () => {
      const hand = new Hand();
      const card1 = new Card("3", "Clubs");
      const card2 = new Card("8", "Diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.resetHand();
      expect(hand.cards.length).toBe(0);
    });
  });
});
