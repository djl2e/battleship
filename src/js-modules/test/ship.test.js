import Ship from '../ship';

const n = 3;
const testShip = new Ship(n);

test('create ship with length n', () => {
  expect(testShip.shipLength).toBe(n);
});

test('hit position 0', () => {
  testShip.hit(0);
  expect(testShip.hitLocation[0]).toBeTruthy();
});

test('sink ship', () => {
  expect(testShip.isSunk()).toBeFalsy();
  for (let i = 1; i < n; i++) {
    testShip.hit(i);
  }
  expect(testShip.isSunk()).toBeTruthy();
});
