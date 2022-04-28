class AI {
  constructor() {
    // stack that tracks ships that were hit but not sunk yet
    this.hitNotSunkStack = [];
    this.lastHitTileId = Array(5).fill(-1);
  }

  getRandomTileId() {
    if (this.hitNotSunkStack.length === 0) {
      return this.getRandomNumber();
    }
    return this.getNextHit();
  }

  static getRandomNumber() {
    return Math.random(100);
  }

  getNextHit() {
    const hitId = this.hitNotSunkStack[this.hitNotSunkStack.length - 1];
    const hitTile = this.lastHitTileId[hitId];

    while (true) {
      const xRand = Math.random(2);
      const yRand = Math.random(2);

      if ((!xRand && !yRand) && hitTile >= 10) {
        return hitTile - 10;
      } if ((xRand && yRand) && hitTile <= 89) {
        return hitTile + 10;
      } if ((!xRand && yRand) && ((hitTile % 10) !== 0)) {
        return hitTile - 1;
      } if ((xRand && !yRand) && ((hitTile % 10) !== 9)) {
        return hitTile + 1;
      }
    }
  }

  addToHitStack(shipId, tileId) {
    this.removeFromStack(shipId);
    this.hitNotSunkStack.push(shipId);
    this.lastHitTileId[shipId] = tileId;
  }

  sink(shipId) {
    this.removeFromStack(shipId);
    this.lastHitTileId[shipId] = -1;
  }

  removeFromStack(shipId) {
    const index = this.hitNotSunkStack.indexOf(shipId);
    if (index !== -1) {
      this.hitNotSunkStack.splice(index, 1);
    }
  }
}

export default AI;
