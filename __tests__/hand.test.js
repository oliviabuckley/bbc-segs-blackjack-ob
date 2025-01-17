import Hand from "../blackjack/hand.js";
import Card from "../blackjack/card.js";

describe("Hand", () => {
  describe("addCard", () => {
    test("add a card to the hand", () => {
      const hand = new Hand();
      const card = new Card("7", "diamonds");
      hand.addCard(card);
      expect(hand.cards.length).toBe(1);
      expect(hand.cards[0]).toBe(card);
    });
    test("add multiple cards to the hand", () => {
      const hand = new Hand();
      const card1 = new Card("7", "diamonds");
      const card2 = new Card("8", "clubs");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.cards.length).toBe(2);
      expect(hand.cards[0]).toBe(card1);
      expect(hand.cards[1]).toBe(card2);
    });
  });
  describe("getHandValue", () => {
    test("return 0 for an empty hand", () => {
      const hand = new Hand();
      expect(hand.getHandValue()).toBe(0);
    });
    test("return the correct value of cards in the hand", () => {
      const hand = new Hand();
      const card1 = new Card("3", "clubs");
      const card2 = new Card("8", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.getHandValue()).toBe(11);
    });
    test("count Ace as 11 if total value is under 21", () => {
      const hand = new Hand();
      hand.addCard(new Card("ace", "spades"));
      hand.addCard(new Card("5", "diamonds"));
      expect(hand.getHandValue()).toBe(16);
    });
    test("count Ace as 1 if total value is over 21", () => {
      const hand = new Hand();
      hand.addCard(new Card("ace", "spades"));
      hand.addCard(new Card("5", "diamonds"));
      hand.addCard(new Card("10", "clubs"));
      expect(hand.getHandValue()).toBe(16);
    });
    test("handle multiple Aces correctly", () => {
      const hand = new Hand();
      const card1 = new Card("ace", "spades");
      const card2 = new Card("ace", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.getHandValue()).toBe(12);
    });
    test("handle multiple aces with other values correctly", () => {
      const hand = new Hand();
      const card1 = new Card("ace", "spades");
      const card2 = new Card("ace", "diamonds");
      const card3 = new Card("9", "hearts");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.getHandValue()).toBe(12);
      hand.addCard(card3);
      expect(hand.getHandValue()).toBe(21);
    });
  });
  describe("showHand", () => {
    test("return correct hand with one card", () => {
      const hand = new Hand();
      const card = new Card("10", "hearts");
      hand.addCard(card);
      expect(hand.showHand()).toBe("10 of hearts");
    });
    test("return a string with card details in the hand", () => {
      const hand = new Hand();
      const card1 = new Card("ace", "spades");
      const card2 = new Card("king", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.showHand()).toBe("ace of spades, king of diamonds");
    });
    test("return empty string for empty hand", () => {
      const hand = new Hand();
      expect(hand.showHand()).toBe("");
    });
  });
  describe("isBust", () => {
    test("return true if value of hand exceeds 21", () => {
      const hand = new Hand();
      const card1 = new Card("8", "clubs");
      const card2 = new Card("10", "diamonds");
      const card3 = new Card("9", "spades");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      expect(hand.isBust()).toBe(true);
    });
    test("return false if value of hand does not exceed 21", () => {
      const hand = new Hand();
      const card1 = new Card("8", "clubs");
      const card2 = new Card("10", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.isBust()).toBe(false);
    });
  });
  describe("hasBlackjack", () => {
    test("return true for a blackjack hand)", () => {
      const hand = new Hand();
      const card1 = new Card("ace", "clubs");
      const card2 = new Card("king", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.hasBlackjack()).toBe(true);
    });
    test("return false for a score below 21", () => {
      const hand = new Hand();
      const card1 = new Card("ace", "clubs");
      const card2 = new Card("3", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.hasBlackjack()).toBe(false);
    });
    test("return false for a score of 21 from more than 2 cards", () => {
      const hand = new Hand();
      const card1 = new Card("10", "clubs");
      const card2 = new Card("10", "diamonds");
      const card3 = new Card("1", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      expect(hand.hasBlackjack()).toBe(false);
    });
  });
  describe("resetHand", () => {
    test("remove all cards from hand", () => {
      const hand = new Hand();
      const card1 = new Card("3", "clubs");
      const card2 = new Card("8", "diamonds");
      hand.addCard(card1);
      hand.addCard(card2);
      hand.resetHand();
      expect(hand.cards.length).toBe(0);
    });
  });
});
