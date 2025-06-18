export class Player {
  constructor(name, isCPU = false) {
    this.name = name;
    this.hand = [];
    this.isCPU = isCPU;
    this.riichi = false;
  }
  draw(tile) {
    this.hand.push(tile);
    this.hand.sort();
  }
  discard() {
    if (this.isCPU) {
      const tile = this.hand.find(t => ['東','南','西','北','白','發','中'].includes(t));
      const index = this.hand.indexOf(tile) !== -1 ? this.hand.indexOf(tile) : 0;
      return this.hand.splice(index, 1)[0];
    }
    return null;
  }
}
