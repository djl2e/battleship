import Gameboard from './gameboard';
import AI from './player';

const userBoard = new Gameboard();
const aiBoard = new Gameboard();

function setAllAiShip() {
  for (let i = 4; i >= 0; i--) {
    const isHorizontal = Math.floor(Math.random() * 2);
    while (true) {
      const tileNumber = AI.getRandomShipTile(i, isHorizontal);
      if (aiBoard.checkShipSetupAvailable(tileNumber, i, isHorizontal)) {
        aiBoard.setShip(tileNumber, i, isHorizontal);
        break;
      }
    }
  }
}

function setUserShip(startTileId, shipId, isHorizontal) {
  if (userBoard.checkShipSetupAvailable(startTileId, shipId, isHorizontal)) {
    userBoard.setShip(startTileId, shipId, isHorizontal);
    return true;
  }
  return false;
}

function checkAiTileVisited(tileId) {
  return aiBoard.isTileVisited(tileId);
}

function userAttack(tileId) {
  return aiBoard.attack(tileId);
}

function aiAttack() {
  let tileId;
  while (true) {
    tileId = AI.getRandomTileId();
    if (!userBoard.isTileVisited(tileId)) {
      const attackSuccess = userBoard.attack(tileId);
      return [tileId, attackSuccess];
    }
  }
}

function aiWins() {
  return userBoard.allShipsSunk();
}

function userWins() {
  return aiBoard.allShipsSunk();
}

function getScores() {
  return [userBoard.getShipsSunk(), aiBoard.getShipsSunk()];
}

export {
  setAllAiShip, setUserShip, checkAiTileVisited, userAttack, aiAttack,
  aiWins, userWins, getScores,
};
