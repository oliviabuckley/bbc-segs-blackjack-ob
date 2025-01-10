import Game from "../blackjack/game.js";
import Deck from "../blackjack/deck.js";
import Card from "../blackjack/card.js";

describe("Game", () => {
  describe("initialiseGame", () => {
    test("initialise a new deck", () => {
      const game = new Game();
      game.initialiseGame();
      expect(game.deck).toBeInstanceOf(Deck);
    });
    test("shuffle the deck", () => {
      const game = new Game();
      game.initialiseGame();
      const originalDeck = [...game.deck.cards];
      game.deck.shuffleDeck();
      expect(game.deck.cards).not.toEqual(originalDeck);
    });
    test("reset the player's hand", () => {
      const game = new Game();
      game.player.hand.addCard({ rank: "ace", suit: "hearts" });
      game.player.hand.addCard({ rank: "king", suit: "clubs" });
      game.initialiseGame();
      expect(game.player.hand.cards.length).toBe(0);
    });
    test("reset the dealer's hand", () => {
      const game = new Game();
      game.dealer.hand.addCard({ rank: "ace", suit: "hearts" });
      game.dealer.hand.addCard({ rank: "king", suit: "clubs" });
      game.initialiseGame();
      expect(game.dealer.hand.cards.length).toBe(0);
    });
  });
  describe("dealInitialCards", () => {
    test("deal 2 cards to both the player and the dealer", () => {
      const game = new Game();
      game.initialiseGame();
      game.dealInitialCards();
      expect(game.player.hand.cards.length).toBe(2);
      expect(game.dealer.hand.cards.length).toBe(2);
    });
  });
  describe("startGame", () => {
    test("recognise player's blackjack", () => {
      const game = new Game();
      const card1 = new Card("ace", "hearts");
      const card2 = new Card("king", "clubs");
      game.player.hand.addCard(card1);
      game.player.hand.addCard(card2);
      expect(game.player.hand.hasBlackjack()).toBe(true);
    });
    test("recognise dealer's blackjack", () => {
      const game = new Game();
      const card1 = new Card("ace", "spades");
      const card2 = new Card("queen", "diamonds");
      game.dealer.hand.addCard(card1);
      game.dealer.hand.addCard(card2);
      expect(game.dealer.hand.hasBlackjack()).toBe(true);
    });
  });
  describe("playerTurn", () => {
    test("allow player to hit and add card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("5", "hearts"));
      const result = game.playerTurn("hit");
      expect(game.player.hand.cards.length).toBe(3);
    });
    test("update hand value after hit", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("5", "hearts"));
      expect(game.player.hand.getHandValue()).toBe(15);
      game.playerTurn("hit");
      expect(game.player.hand.getHandValue()).toBeGreaterThan(15);
    });
    test("end the game if player goes over 21 on a hit", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("queen", "hearts"));
      game.deck.cards = [new Card("5", "clubs")];
      const endGameSpy = jest.spyOn(game, "endGame");
      game.playerTurn("hit");
      expect(endGameSpy).toHaveBeenCalledWith("Player Busts. Dealer Wins!");
      endGameSpy.mockRestore();
    });
    test("allow player to stand and does not add a card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("5", "hearts"));
      game.playerTurn("stand");
      expect(game.player.hand.cards.length).toBe(2);
    });
    test("retain hand value after stand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("5", "hearts"));
      expect(game.player.hand.getHandValue()).toBe(15);
      game.playerTurn("stand");
      expect(game.player.hand.getHandValue()).toBe(15);
    });
  });
  describe("dealerTurn", () => {
    test("end the game if dealer goes over 21", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("king", "diamonds"));
      game.dealer.hand.addCard(new Card("6", "hearts"));
      game.deck.cards = [new Card("7", "clubs")];
      game.dealerTurn();
      expect(game.message).toBe("Dealer Busts. Player Wins!");
    });
    test("allow dealer to finish turn if it is not a bust", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("7", "diamonds"));
      game.dealer.hand.addCard(new Card("9", "hearts"));
      game.deck.cards = [new Card("2", "clubs")];
      game.dealerTurn();
      expect(game.dealer.hand.getHandValue()).toBe(18);
    });
    test("dealer stops drawing cards after reaching 17 or more", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("10", "Diamonds"));
      game.dealer.hand.addCard(new Card("6", "Hearts"));
      game.deck.cards = [new Card("5", "Clubs"), new Card("2", "Spades")];
      game.dealerTurn();
      expect(game.dealer.hand.getHandValue()).toBe(18);
      expect(game.dealer.hand.cards.length).toBe(3);
      game.dealerTurn();
      expect(game.dealer.hand.getHandValue()).toBe(18);
      expect(game.dealer.hand.cards.length).toBe(3);
    });
  });
  describe("determineWinner", () => {
    test("player wins when player's hand value is greater than dealer's hand value", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("queen", "hearts"));
      game.dealer.hand.addCard(new Card("8", "clubs"));
      game.dealer.hand.addCard(new Card("6", "spades"));
      game.determineWinner();
      expect(game.message).toBe("Player Wins!");
    });
    test("dealer wins when dealer's hand value is greater than player's hand value", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("8", "diamonds"));
      game.player.hand.addCard(new Card("7", "hearts"));
      game.dealer.hand.addCard(new Card("9", "clubs"));
      game.dealer.hand.addCard(new Card("10", "spades"));
      game.determineWinner();
      expect(game.message).toBe("Dealer Wins!");
    });
    test("game is a draw when player and dealer have the same hand value", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("king", "diamonds"));
      game.player.hand.addCard(new Card("8", "hearts"));
      game.dealer.hand.addCard(new Card("9", "clubs"));
      game.dealer.hand.addCard(new Card("9", "spades"));
      game.determineWinner();
      expect(game.message).toBe("It's a Tie!");
    });
  });
  describe("endGame", () => {
    test("set isGameOver to true when the game ends", () => {
      const game = new Game();
      game.endGame("Player Wins!");
      expect(game.isGameOver).toBe(true);
    });
    test("set the correct end game message", () => {
      const game = new Game();
      game.endGame("Player Wins!");
      expect(game.message).toBe("Player Wins!");
    });
    test("end the game with a draw", () => {
      const game = new Game();
      game.endGame("It's a Tie!");
      expect(game.isGameOver).toBe(true);
      expect(game.message).toBe("It's a Tie!");
    });
    test("end the game with dealer win", () => {
      const game = new Game();
      game.endGame("Dealer Wins!");
      expect(game.isGameOver).toBe(true);
      expect(game.message).toBe("Dealer Wins!");
    });
  });
});
