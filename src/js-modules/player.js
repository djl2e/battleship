class AI {
  static getRandomTileId() {
    return AI.getRandomInt(100);
  }

  static getRandomShipTile(shipId, isHorizontal) {
    let xRand;
    let yRand;
    if (isHorizontal) {
      xRand = AI.getRandomInt(10);
      yRand = AI.getRandomInt(10 - shipId);
    } else {
      xRand = AI.getRandomInt(10 - shipId);
      yRand = AI.getRandomInt(10);
    }
    return xRand * 10 + yRand;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

export default AI;
