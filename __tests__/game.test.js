const Game = require("../blackjack/game");
const Deck = require("../blackjack/deck");
const Player = require("../blackjack/player");
const Dealer = require("../blackjack/dealer");
const Card = require("../blackjack/card");

describe("Game", () => {
  describe("startGame", () => {
    test("shuffle the deck", () => {
      const deck = new Deck();
      const game = new Game();
      game.startGame();
      const originalDeck = [...deck.cards];
      deck.shuffleDeck();
      expect(deck.cards).not.toEqual(originalDeck);
    });
    test("should clear previous hands before dealing cards and then deal two cards to player and dealer", () => {
      const game = new Game();
      game.startGame();
      expect(game.player.hand.cards.length).toBe(2);
      expect(game.dealer.hand.cards.length).toBe(2);
    });
    test("should recognise player's blackjack", () => {
      const game = new Game();
      const card1 = new Card("Ace", "Hearts");
      const card2 = new Card("King", "Clubs");
      game.player.addCard(card1);
      game.player.addCard(card2);
      expect(game.player.hasBlackjack()).toBe(true);
    });
    test("should recognise dealer's blackjack", () => {
      const game = new Game();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("Queen", "Diamonds");
      game.dealer.addCard(card1);
      game.dealer.addCard(card2);
      expect(game.dealer.hasBlackjack()).toBe(true);
    });
  });
  describe("playerTurn", () => {
    test("allow player to hit and add card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      const result = game.playerTurn("hit");
      expect(result).toBe("Player Hits");
      expect(game.player.hand.cards.length).toBe(3);
    });
    test("update hand value after hit", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      expect(game.player.hand.getHandValue()).toBe(15);
      game.playerTurn("hit");
      expect(game.player.hand.getHandValue()).toBeGreaterThan(15);
    });
    test("end the game if player goes over 21 on a hit", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("Queen", "Hearts"));
      game.deck.cards = [new Card("5", "Clubs")];
      const result = game.playerTurn("hit");
      expect(result).toBe("Player Busts");
      expect(game.gameOver).toBe(true);
    });
    test("allow player to stand and does not add a card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      const result = game.playerTurn("stand");
      expect(result).toBe("Player Stands");
      expect(game.player.hand.cards.length).toBe(2);
    });
    test("retain hand value after stand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      expect(game.player.hand.getHandValue()).toBe(15);
      game.playerTurn("stand");
      expect(game.player.hand.getHandValue()).toBe(15);
    });
  });
  describe("dealerTurn", () => {
    test("end the game if dealer goes over 21", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("8", "Diamonds"));
      game.dealer.hand.addCard(new Card("5", "Hearts"));
      game.deck.cards = [new Card("10", "Clubs")];
      const result = game.dealerTurn();
      expect(result).toBe("Dealer Busts");
      expect(game.gameOver).toBe(true);
    });
    test("allow dealer to finish turn if it is not a bust", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("7", "Diamonds"));
      game.dealer.hand.addCard(new Card("9", "Hearts"));
      game.deck.cards = [new Card("2", "Clubs")];
      const result = game.dealerTurn();
      expect(result).toBe("Dealer Finishes Turn");
      expect(game.dealer.hand.getHandValue()).toBe(18);
      expect(game.gameOver).toBe(false);
    });
    test("dealer stops drawing cards after reaching 17 or more", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("10", "Diamonds"));
      game.dealer.hand.addCard(new Card("6", "Hearts"));
      game.deck.cards = [new Card("5", "Clubs"), new Card("2", "Spades")];
      const result1 = game.dealerTurn();
      expect(result1).toBe("Dealer Finishes Turn");
      expect(game.dealer.hand.getHandValue()).toBe(18);
      expect(game.dealer.hand.cards.length).toBe(3);
      const result2 = game.dealerTurn();
      expect(result2).toBe("Dealer Finishes Turn");
      expect(game.dealer.hand.getHandValue()).toBe(18);
      expect(game.dealer.hand.cards.length).toBe(3);
    });
  });
});
