import Player from "../blackjack/player.js";

describe("Player", () => {
  test("initialise with a name and an empty hand", () => {
    const player = new Player("Olivia");
    expect(player.name).toBe("Olivia");
    expect(player.hand.cards.length).toBe(0);
  });
});
