import Gameboard from '../gameboard';

const testGameboard = new Gameboard();

test('set ship 2 at tile 35 vertically', () => {
  testGameboard.setShip(35, 2, false);
  expect(testGameboard.tiles[45].shipId).toBe(2);
  expect(testGameboard.tiles[55].shipPosition).toBe(2);
});

test('set ship 1 at tile 51 horizontally', () => {
  testGameboard.setShip(51, 1, true);
  expect(testGameboard.tiles[51].shipId).toBe(1);
  expect(testGameboard.tiles[52].shipPosition).toBe(1);
});

test('attack tile without a ship', () => {
  testGameboard.attack(1);
  expect(testGameboard.isTileVisited(1)).toBeTruthy();
});

test('attack tile with a ship', () => {
  testGameboard.attack(35);
  expect(testGameboard.isTileVisited(35)).toBeTruthy();
  expect(testGameboard.shipArray[2].hitLocation[0]).toBeTruthy();
});

test('sink a ship', () => {
  testGameboard.attack(45);
  testGameboard.attack(55);
  expect(testGameboard.shipArray[2].isSunk()).toBeTruthy();
  expect(testGameboard.shipsSunk).toBe(1);
});

// test('get a tile', () => {
//   const testTile = testGameboard.getTile(30);
//   expect(typeof testTile).toBe('object');
//   expect(testTile.isTileVisited()).toBeFalsy();
// });

test('setup an AI ship on empty tiles and check if it is available', () => {
  testGameboard.setShip(0, 4, true);
  expect(testGameboard.checkShipSetupAvailable(3, 3, false)).toBeFalsy();
  expect(testGameboard.checkShipSetupAvailable(5, 2, true)).toBeTruthy();
});

test('setup an AI ship on empty tiles and check if it is available 2', () => {
  testGameboard.setShip(65, 2, false);
  expect(testGameboard.checkShipSetupAvailable(75, 3, true)).toBeFalsy();
  expect(testGameboard.checkShipSetupAvailable(85, 2, true)).toBeFalsy();
  expect(testGameboard.checkShipSetupAvailable(95, 2, true)).toBeTruthy();
});
