import Tile from './tile';
import Ship from './ship';

class Gameboard {
  constructor() {
    this.tiles = [];
    this.ships = [];
    this.numShipsSunk = 0;

    for (let i = 0; i < 100; i++) {
      this.tiles[i] = new Tile(i);
    }

    for (let i = 0; i < 5; i++) {
      this.ships[i] = new Ship(i + 1);
    }
  }

  setShip(startTileId, shipId, shipLength, isHorizontal) {
    let tileId = startTileId;
    let position = 0;
    while (position < shipLength) {
      this.tiles[tileId].placeShip(shipId, position);
      position += 1;
      if (isHorizontal) {
        tileId += 1;
      } else {
        tileId += 10;
      }
    }
  }

  hasVisited(tileId) {
    return this.tiles[tileId].isTileVisited();
  }

  allShipsSunk() {
    return this.numShipsSunk === this.ships.length;
  }

  attack(tileId) {
    const tileAttacked = this.tiles[tileId];
    tileAttacked.visitTile();

    if (tileAttacked.shipId !== -1) {
      const shipAttackedId = tileAttacked.shipId;
      const shipAttackedPosition = tileAttacked.shipPosition;

      this.ships[shipAttackedId].hit(shipAttackedPosition);
      if (this.ships[shipAttackedId].isSunk()) {
        this.numShipsSunk += 1;
      }
    }
  }
}

export default Gameboard;
