const Deck = require("../blackjack/deck");

describe("Deck", () => {
  describe("createDeck", () => {
    test("create a deck of 52 cards", () => {
      const deck = new Deck();
      expect(deck.cards.length).toBe(52);
    });
    test("contain one of each rank-suit combination", () => {
      const deck = new Deck();
      const ranks = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        "Ace",
      ];
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      ranks.forEach((rank) => {
        suits.forEach((suit) => {
          const cardFound = deck.cards.some(
            (card) => card.rank === rank && card.suit === suit
          );
          expect(cardFound).toBe(true);
        });
      });
    });
    test("contain only unique cards, no duplicates", () => {
      const deck = new Deck();
      const uniqueCards = new Set();
      deck.cards.forEach((card) => {
        const cardIdentifier = `${card.rank}-${card.suit}`;
        expect(uniqueCards.has(cardIdentifier)).toBe(false);
        uniqueCards.add(cardIdentifier);
      });
      expect(uniqueCards.size).toBe(52);
    });
  });
  describe("shuffleDeck", () => {
    test("shuffle the deck", () => {
      const deck = new Deck();
      const originalDeck = [...deck.cards];
      deck.shuffleDeck();
      expect(deck.cards).not.toEqual(originalDeck);
    });
    test("still have 52 cards after shuffle", () => {
      const deck = new Deck();
      const originalDeck = deck.cards;
      deck.shuffleDeck();
      expect(deck.cards.length).toBe(originalDeck.length);
    });
  });
  describe("drawCard", () => {
    test("return a card object", () => {
      const deck = new Deck();
      const drawnCard = deck.drawCard();
      expect(typeof drawnCard).toBe("object");
      expect(drawnCard).toHaveProperty("rank");
      expect(drawnCard).toHaveProperty("suit");
    });
    test("return the last card in the deck", () => {
      const deck = new Deck();
      const lastCardInDeck = deck.cards[deck.cards.length - 1];
      const drawnCard = deck.drawCard();
      expect(drawnCard).toEqual(lastCardInDeck);
    });
    test("remove card from deck", () => {
      const deck = new Deck();
      const initialDeckLength = deck.cards.length;
      deck.drawCard();
      expect(deck.cards.length).toBe(initialDeckLength - 1);
    });
  });
  describe("resetDeck", () => {
    test("reset the deck to 52 cards", () => {
      const deck = new Deck();
      deck.drawCard();
      deck.resetDeck();
      expect(deck.cards.length).toBe(52);
    });
    test("reset the deck to contain all unique rank-suit combinations", () => {
      const deck = new Deck();
      deck.shuffleDeck();
      deck.drawCard();
      deck.resetDeck();
      const uniqueCards = new Set(
        deck.cards.map((card) => `${card.rank} of ${card.suit}`)
      );
      expect(uniqueCards.size).toBe(52);
    });
    test("should reset the deck to its original order (unshuffled)", () => {
      const deck = new Deck();
      const originalDeck = deck.cards.map(
        (card) => `${card.rank} of ${card.suit}`
      );
      deck.shuffleDeck();
      deck.resetDeck();
      const resetDeck = deck.cards.map(
        (card) => `${card.rank} of ${card.suit}`
      );
      expect(resetDeck).toEqual(originalDeck);
    });
  });
});
