import Gameboard from '../gameboard';

const testGameboard = new Gameboard();

test('set ship 2 at tile 35 vertically', () => {
  testGameboard.setShip(35, 2, 3, false);
  expect(testGameboard.tiles[45].shipId).toBe(2);
  expect(testGameboard.tiles[55].shipPosition).toBe(2);
});

test('set ship 1 at tile 51 horizontally', () => {
  testGameboard.setShip(51, 1, 2, true);
  expect(testGameboard.tiles[51].shipId).toBe(1);
  expect(testGameboard.tiles[52].shipPosition).toBe(1);
});

test('attack tile without a ship', () => {
  testGameboard.attack(1);
  expect(testGameboard.hasVisited(1)).toBeTruthy();
});

test('attack and sink a ship', () => {
  testGameboard.setShip(0, 0, 1, true);
  testGameboard.attack(0);
  expect(testGameboard.numShipsSunk).toBe(1);
  expect(testGameboard.ships[0].isSunk()).toBeTruthy();
});

test('sink all ship', () => {
  testGameboard.setShip(61, 3, 4, true);
  testGameboard.setShip(70, 4, 5, true);

  for (let i = 2; i < 100; i++) {
    testGameboard.attack(i);
  }

  expect(testGameboard.ships[3].isSunk()).toBeTruthy();
  expect(testGameboard.ships[4].isSunk()).toBeTruthy();
  expect(testGameboard.allShipsSunk()).toBeTruthy();
});
