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
      game.player.hand.addCard({ rank: "Ace", suit: "Hearts" });
      game.player.hand.addCard({ rank: "King", suit: "Clubs" });
      game.initialiseGame();
      expect(game.player.hand.cards.length).toBe(0);
    });
    test("reset the dealer's hand", () => {
      const game = new Game();
      game.dealer.hand.addCard({ rank: "Ace", suit: "Hearts" });
      game.dealer.hand.addCard({ rank: "King", suit: "Clubs" });
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
      const card1 = new Card("Ace", "Hearts");
      const card2 = new Card("King", "Clubs");
      game.player.hand.addCard(card1);
      game.player.hand.addCard(card2);
      expect(game.player.hand.hasBlackjack()).toBe(true);
    });
    test("recognise dealer's blackjack", () => {
      const game = new Game();
      const card1 = new Card("Ace", "Spades");
      const card2 = new Card("Queen", "Diamonds");
      game.dealer.hand.addCard(card1);
      game.dealer.hand.addCard(card2);
      expect(game.dealer.hand.hasBlackjack()).toBe(true);
    });
  });
  describe("playerTurn", () => {
    test("allow player to hit and add card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      const result = game.playerTurn("hit");
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
      const endGameSpy = jest.spyOn(game, "endGame");
      game.playerTurn("hit");
      expect(endGameSpy).toHaveBeenCalledWith("Player Busts. Dealer Wins!");
      endGameSpy.mockRestore();
    });
    test("allow player to stand and does not add a card to hand", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("5", "Hearts"));
      const result = game.playerTurn("stand");
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
      game.dealer.hand.addCard(new Card("King", "Diamonds"));
      game.dealer.hand.addCard(new Card("6", "Hearts"));
      game.deck.cards = [new Card("7", "Clubs")];
      const endGameSpy = jest.spyOn(game, "endGame");
      game.dealerTurn();
      expect(endGameSpy).toHaveBeenCalledWith("Dealer Busts. Player Wins!");
      endGameSpy.mockRestore();
    });
    test("allow dealer to finish turn if it is not a bust", () => {
      const game = new Game();
      game.dealer.hand.addCard(new Card("7", "Diamonds"));
      game.dealer.hand.addCard(new Card("9", "Hearts"));
      game.deck.cards = [new Card("2", "Clubs")];
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
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("Queen", "Hearts"));
      game.dealer.hand.addCard(new Card("8", "Clubs"));
      game.dealer.hand.addCard(new Card("6", "Spades"));
      const endGameSpy = jest.spyOn(game, "endGame");
      game.determineWinner();
      expect(endGameSpy).toHaveBeenCalledWith("Player Wins!");
      endGameSpy.mockRestore();
    });
    test("dealer wins when dealer's hand value is greater than player's hand value", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("8", "Diamonds"));
      game.player.hand.addCard(new Card("7", "Hearts"));
      game.dealer.hand.addCard(new Card("9", "Clubs"));
      game.dealer.hand.addCard(new Card("10", "Spades"));
      const endGameSpy = jest.spyOn(game, "endGame");
      game.determineWinner();
      expect(endGameSpy).toHaveBeenCalledWith("Dealer Wins!");
      endGameSpy.mockRestore();
    });
    test("game is a draw when player and dealer have the same hand value", () => {
      const game = new Game();
      game.player.hand.addCard(new Card("King", "Diamonds"));
      game.player.hand.addCard(new Card("8", "Hearts"));
      game.dealer.hand.addCard(new Card("9", "Clubs"));
      game.dealer.hand.addCard(new Card("9", "Spades"));
      const endGameSpy = jest.spyOn(game, "endGame");
      game.determineWinner();
      expect(endGameSpy).toHaveBeenCalledWith("It's a Tie!");
      endGameSpy.mockRestore();
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
