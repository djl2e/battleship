import Tile from './tile';
import Ship from './ship';

class Gameboard {
  constructor() {
    this.tiles = [];
    this.shipArray = [];
    this.shipsSunk = 0;

    for (let i = 0; i < 100; i++) {
      this.tiles[i] = new Tile(i);
    }
    for (let i = 0; i < 5; i++) {
      this.shipArray[i] = new Ship(i + 1);
    }
  }

  setShip(startTileId, shipId, isHorizontal) {
    let tileId = parseInt(startTileId);
    for (let i = 0; i < shipId + 1; i++) {
      this.tiles[tileId].placeShip(shipId, i);
      if (isHorizontal) {
        tileId += 1;
      } else {
        tileId += 10;
      }
    }
  }

  checkShipSetupAvailable(startTileId, shipId, isHorizontal) {
    let tileId = parseInt(startTileId);

    if (isHorizontal) {
      if (startTileId % 10 > (9 - shipId)) {
        return false;
      }
    } else if (Math.floor(startTileId / 10) > (9 - shipId)) {
      return false;
    }

    for (let i = 0; i < shipId + 1; i++) {
      if (tileId < 0 || tileId >= 100) {
        return false;
      }

      const tileInQuestion = this.tiles[tileId];
      if (tileInQuestion.getShip()[0] !== -1) {
        return false;
      }

      if (isHorizontal) {
        tileId += 1;
      } else {
        tileId += 10;
      }
    }

    return true;
  }

  isTileVisited(tileId) {
    return this.tiles[tileId].isTileVisited();
  }

  attack(tileId) {
    const tileAttacked = this.tiles[tileId];
    tileAttacked.visitTile();

    const tileShipArray = tileAttacked.getShip();
    const tileShipId = tileShipArray[0];
    const tileShipPosition = tileShipArray[1];

    if (tileShipId !== -1) {
      const shipAttacked = this.shipArray[tileShipId];
      shipAttacked.hit(tileShipPosition);
      if (shipAttacked.isSunk()) {
        this.shipsSunk += 1;
      }
      return true;
    }
    return false;
  }

  getShipsSunk() {
    return this.shipsSunk;
  }

  allShipsSunk() {
    return this.shipsSunk === this.shipArray.length;
  }
}

export default Gameboard;
