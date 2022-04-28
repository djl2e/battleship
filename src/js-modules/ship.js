class Ship {
  constructor(shipLength) {
    this.shipLength = shipLength;
    this.hitLocation = Array(shipLength).fill(false);
    this.numHit = 0;
  }

  hit(shipPosition) {
    this.hitLocation[shipPosition] = true;
    this.numHit += 1;
  }

  isSunk() {
    return this.numHit === this.shipLength;
  }
}

export default Ship;
