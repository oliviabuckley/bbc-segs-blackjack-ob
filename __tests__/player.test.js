const Player = require("../blackjack/player");
const Card = require("../blackjack/card");
const Hand = require("../blackjack/hand");

describe("Player", () => {
  describe("addCard", () => {
    test("add a card to the player's hand", () => {
      const player = new Player();
      const card = new Card("Ace", "Spades");
      player.addCard(card);
      expect(player.hand.cards.length).toBe(1);
      expect(player.hand.cards[0]).toBe(card);
    });
  });
  describe("getHand", () => {
    test("return card in player's hand", () => {
      const player = new Player();
      const card = new Card("Ace", "Clubs");
      player.addCard(card);
      const hand = player.getHand();
      expect(hand.cards.length).toBe(1);
      expect(hand.cards[0]).toBe(card);
    });
    test("return empty hand when no cards have been added", () => {
      const player = new Player();
      const hand = player.getHand();
      expect(hand.cards.length).toBe(0);
    });
  });
  describe("hasBlackjack", () => {
    test("return true if player has a Blackjack", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Hearts");
      const card2 = new Card("King", "Clubs");
      player.addCard(card1);
      player.addCard(card2);
      expect(player.hasBlackjack()).toBe(true);
    });
    test("return false if player does not have a Blackjack", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("9", "Diamonds");
      player.addCard(card1);
      player.addCard(card2);
      expect(player.hasBlackjack()).toBe(false);
    });
  });
  describe("isBusted", () => {
    test("return true if the player is over 21", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      const card3 = new Card("9", "Hearts");
      const card4 = new Card("6", "Diamonds");
      player.addCard(card1);
      player.addCard(card2);
      player.addCard(card3);
      player.addCard(card4);
      expect(player.isBusted()).toBe(true);
    });
    test("should return false if the player is not busted (hand value under 21)", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      player.addCard(card1);
      player.addCard(card2);
      expect(player.isBusted()).toBe(false);
    });
  });
  describe("showHand", () => {
    test("show the player's hand correctly", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Diamonds");
      player.addCard(card1);
      player.addCard(card2);
      expect(player.showHand()).toBe("Ace of Spades, King of Diamonds");
    });
    test("show the player's hand with one card", () => {
      const player = new Player();
      const card = new Card("10", "Hearts");
      player.addCard(card);
      expect(player.showHand()).toBe("10 of Hearts");
    });
    test("show empty string if the player has no cards", () => {
      const player = new Player();
      expect(player.showHand()).toBe("");
    });
  });
  describe("clearHand", () => {
    test("should clear the player's hand", () => {
      const player = new Player();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("King", "Clubs");
      player.addCard(card1);
      player.addCard(card2);
      expect(player.getHand().cards.length).toBe(2);
      player.clearHand();
      expect(player.getHand().cards.length).toBe(0);
    });
  });
});
