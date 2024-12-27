const Dealer = require("../blackjack/dealer");
const Card = require("../blackjack/card");
const Deck = require("../blackjack/deck");

describe("Dealer", () => {
  describe("addCard", () => {
    test("add a card to the Dealer's hand", () => {
      const dealer = new Dealer();
      const card = new Card("Ace", "Spades");
      dealer.addCard(card);
      expect(dealer.hand.cards.length).toBe(1);
      expect(dealer.hand.cards[0]).toBe(card);
    });
  });
  describe("hasBlackjack", () => {
    test("return true if dealer has a Blackjack", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Hearts");
      const card2 = new Card("King", "Clubs");
      dealer.addCard(card1);
      dealer.addCard(card2);
      expect(dealer.hasBlackjack()).toBe(true);
    });
    test("return false if dealer does not have a Blackjack", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("9", "Diamonds");
      dealer.addCard(card1);
      dealer.addCard(card2);
      expect(dealer.hasBlackjack()).toBe(false);
    });
  });
  describe("isBusted", () => {
    test("return true if the dealer is over 21", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      const card3 = new Card("9", "Hearts");
      const card4 = new Card("6", "Diamonds");
      dealer.addCard(card1);
      dealer.addCard(card2);
      dealer.addCard(card3);
      dealer.addCard(card4);
      expect(dealer.isBusted()).toBe(true);
    });
    test("return false if the dealer under 21", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      dealer.addCard(card1);
      dealer.addCard(card2);
      expect(dealer.isBusted()).toBe(false);
    });
  });
  describe("showHand", () => {
    test("show the dealer's hand correctly", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Diamonds");
      dealer.addCard(card1);
      dealer.addCard(card2);
      expect(dealer.showHand()).toBe("Ace of Spades, King of Diamonds");
    });
    test("show the dealer's hand with one card", () => {
      const dealer = new Dealer();
      const card = new Card("10", "Hearts");
      dealer.addCard(card);
      expect(dealer.showHand()).toBe("10 of Hearts");
    });
    test("show empty string if the dealer has no cards", () => {
      const dealer = new Dealer();
      expect(dealer.showHand()).toBe("");
    });
  });
  describe("clearHand", () => {
    test("should clear the dealer's hand", () => {
      const dealer = new Dealer();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      dealer.addCard(card1);
      dealer.addCard(card2);
      expect(dealer.hand.cards.length).toBe(2);
      dealer.clearHand();
      expect(dealer.hand.cards.length).toBe(0);
    });
  });
  describe("playTurn", () => {
    test("dealer draws cards until hand value is at least 17", () => {
      const dealer = new Dealer();
      const deck = new Deck();
      dealer.addCard(new Card("5", "Hearts"));
      dealer.addCard(new Card("6", "Clubs"));
      dealer.playTurn(deck);
      expect(dealer.hand.getHandValue()).toBeGreaterThanOrEqual(17);
    });
    test("dealer does not draw cards if hand value is already 17 or more", () => {
      const dealer = new Dealer();
      const deck = new Deck();
      dealer.addCard(new Card("10", "Spades"));
      dealer.addCard(new Card("7", "Hearts"));
      dealer.playTurn(deck);
      expect(dealer.hand.getHandValue()).toBe(17);
    });
  });
});
