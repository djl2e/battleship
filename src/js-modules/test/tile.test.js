import Tile from '../tile';

const testTile = new Tile(57);

test('create default tile', () => {
  expect(testTile.tileId).toBe(57);
  expect(testTile.isTileVisited()).toBeFalsy();
});

test('place a ship on the tile', () => {
  testTile.placeShip(0, 0);
  expect(testTile.shipId).toBe(0);
  expect(testTile.shipPosition).toBe(0);
});

test('visit the tile', () => {
  testTile.visitTile();
  expect(testTile.isTileVisited()).toBeTruthy();
});
