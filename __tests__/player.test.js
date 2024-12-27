const Player = require("../blackjack/player");
const Card = require("../blackjack/card");

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
});
