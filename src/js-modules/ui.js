import {
  checkAiTileVisited, userAttack, aiAttack, getScores,
  aiWins, userWins,
} from './gameplay';

const main = document.querySelector('.main');
const aiBoard = document.querySelector('#ai-board');
const scoreBoard = document.querySelector('#score-board');
const gameEndContainer = document.querySelector('.game-end');
const gameResult = document.querySelector('#game-result');
const gameReplayButton = document.querySelector('#replay-game');

function updateScore() {
  const newScores = getScores();
  scoreBoard.textContent = `${newScores[0]} : ${newScores[1]}`;
}

function gameEnd(userIsWinner) {
  main.classList.add('opaque');
  gameEndContainer.classList.remove('hidden');
  if (userIsWinner) {
    gameResult.textContent = 'Player Wins!';
  } else {
    gameResult.textContent = 'Computer Wins';
  }
}

function userAttackUI() {
  aiBoard.addEventListener('click', (event) => {
    const tileAttacked = parseInt(event.target.id.slice(6));
    const emptyTile = !checkAiTileVisited(tileAttacked);

    if (emptyTile) {
      const aiTileAttacked = document.querySelector(`#aiTile${tileAttacked}`);
      aiTileAttacked.classList.remove('empty');

      const attackSuccess = userAttack(tileAttacked);
      if (attackSuccess) {
        aiTileAttacked.classList.add('hit');
      } else {
        aiTileAttacked.classList.add('miss');
      }

      updateScore();
      if (userWins()) {
        gameEnd(true);
      }

      const attackResult = aiAttack();
      const userTileAttacked = document.querySelector(`#userTile${attackResult[0]}`);
      if (attackResult[1]) {
        userTileAttacked.classList.remove('permanent');
        userTileAttacked.classList.add('hit');
      } else {
        userTileAttacked.classList.add('miss');
      }

      updateScore();
      if (aiWins()) {
        gameEnd(false);
      }
    }
  });
}

function callReplay() {
  gameReplayButton.addEventListener('click', () => {
    location.reload();
  });
}

export { userAttackUI, callReplay };
