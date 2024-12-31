import Hand from "./hand.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
  }
}
