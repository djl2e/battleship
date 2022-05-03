import AI from '../player';

const ai = new AI();

test('get random number', () => {
  const randomNumber = ai.getRandomTileId();
  expect(randomNumber).toBeGreaterThanOrEqual(0);
  expect(randomNumber).toBeLessThan(100);
});

test('get next hit', () => {
  ai.addToHitStack(4, 30);
  const randomNumber = ai.getRandomTileId();
  expect(ai.hitNotSunkStack.length).toBe(1);
  expect(ai.lastHitTileId[4]).toBe(30);
  expect(randomNumber).toBeGreaterThanOrEqual(20);
  expect(randomNumber).toBeLessThanOrEqual(40);
});

test('sink', () => {
  ai.sink(4);
  expect(ai.hitNotSunkStack.length).toBe(0);
  expect(ai.lastHitTileId[4]).toBe(-1);
});
