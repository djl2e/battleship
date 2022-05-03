import { setAllAiShip, setUserShip } from './gameplay';

const main = document.querySelector('.main');
const userBoard = document.querySelector('#user-board');
const aiBoard = document.querySelector('#ai-board');

const setUpBoardContainer = document.querySelector('.place-ship');
const setUpBoard = document.querySelector('#setup-board');
const rotateButton = document.querySelector('#rotate');
const gameEndContainer = document.querySelector('.game-end');

let isHorizontal = true;
let userShipId = 4;

function initialBoardGrid() {
  for (let i = 0; i < 100; i++) {
    const newUserDiv = document.createElement('div');
    const newAiDiv = document.createElement('div');
    const newSetUpDiv = document.createElement('div');

    newUserDiv.setAttribute('id', `userTile${i}`);
    newAiDiv.setAttribute('id', `aiTile${i}`);
    newSetUpDiv.setAttribute('id', `setUpTile${i}`);

    userBoard.appendChild(newUserDiv);
    aiBoard.appendChild(newAiDiv);
    setUpBoard.appendChild(newSetUpDiv);
  }
}

function permanentGlow(startTileId) {
  let tileId = parseInt(startTileId);
  for (let i = 0; i < userShipId + 1; i++) {
    const currentSetUpTile = document.querySelector(`#setUpTile${tileId}`);
    currentSetUpTile.classList.add('permanent');
    if (isHorizontal) {
      tileId += 1;
    } else {
      tileId += 10;
    }
  }
}

function glowSetUp(startTileId) {
  let tileId = parseInt(startTileId);
  for (let i = 0; i < userShipId + 1; i++) {
    const currentSetUpTile = document.querySelector(`#setUpTile${tileId}`);
    currentSetUpTile.classList.add('glow');
    if (isHorizontal) {
      if (tileId % 10 === 9) {
        break;
      }
      tileId += 1;
    } else {
      if (Math.floor(tileId / 10) === 9) {
        break;
      }
      tileId += 10;
    }
  }
}

function removeGlowSetUp(startTileId) {
  let tileId = parseInt(startTileId);
  for (let i = 0; i < userShipId + 1; i++) {
    const currentSetUpTile = document.querySelector(`#setUpTile${tileId}`);
    if (currentSetUpTile.classList.contains('glow')) {
      currentSetUpTile.classList.remove('glow');
    }
    if (isHorizontal) {
      if (tileId % 10 === 9) {
        break;
      }
      tileId += 1;
    } else {
      if (Math.floor(tileId / 10) === 9) {
        break;
      }
      tileId += 10;
    }
  }
}

function userBoardCopy() {
  for (let i = 0; i < 100; i++) {
    const currentSetUpTile = document.querySelector(`#setUpTile${i}`);
    const currentUserTile = document.querySelector(`#userTile${i}`);

    if (currentSetUpTile.classList.contains('permanent')) {
      currentUserTile.classList.add('permanent');
    }
  }
}

function emptyAiBoard() {
  for (let i = 0; i < 100; i++) {
    const currentAiTile = document.querySelector(`#aiTile${i}`);
    currentAiTile.classList.add('empty');
  }
}

function setShip(startTileId) {
  const shipSet = setUserShip(startTileId, userShipId, isHorizontal);
  if (shipSet) {
    permanentGlow(startTileId);
    userShipId -= 1;
    if (userShipId === -1) {
      setAllAiShip();
      userBoardCopy();
      emptyAiBoard();
      while (setUpBoard.firstChild) {
        setUpBoard.removeChild(setUpBoard.lastChild);
        setUpBoardContainer.classList.add('hidden');
        main.classList.remove('opaque');
      }
    }
  }
}

function setUpBoardHover() {
  const setUpBoardGrids = document.querySelectorAll('#setup-board div');
  setUpBoardGrids.forEach((setUpGrid) => {
    setUpGrid.addEventListener('mouseenter', (event) => {
      glowSetUp(event.target.id.slice(9));
    });
    setUpGrid.addEventListener('mouseleave', (event) => {
      removeGlowSetUp(event.target.id.slice(9));
    });
    setUpGrid.addEventListener('click', (event) => {
      setShip(event.target.id.slice(9));
    });
  });
}

function rotateShip() {
  rotateButton.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
  });
}

function gameSetup() {
  initialBoardGrid();
  setUpBoardHover();
  rotateShip();
}

export default gameSetup;
