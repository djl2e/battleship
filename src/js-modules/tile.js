class Tile {
  constructor(tileId) {
    this.tileId = tileId;
    this.shipId = -1;
    this.shipPosition = -1;
    this.visited = false;
  }

  placeShip(shipId, shipPosition) {
    this.shipId = shipId;
    this.shipPosition = shipPosition;
  }

  visitTile() {
    this.visited = true;
  }

  isTileVisited() {
    return this.visited;
  }
}

export default Tile;
