import {
  cellAttacked,
  boardGenerator,
  enableBoard,
  disableBoard,
  shipsColor,
} from "./domManager.js";
import { Player } from "./Players.js";
import { Ship } from "./Ship.js";

let player1 = Player();
let player2 = Player("cpu");
let activePlayer = player1;

const getPlayer1 = () => player1;
const getPlayer2 = () => player2;

const resetPlayersBoard = () => {
  player1 = Player();
  player2 = Player("cpu");
  activePlayer = player1;
};

const intializeBoard = () => {
  boardGenerator(getPlayer1());
};

const gameStart = () => {
  // intialize the ships for player 2
  const carrier2 = Ship(5);
  const battleship2 = Ship(4);
  const cruiser2 = Ship(3);
  const submarine2 = Ship(3);
  const destroyer2 = Ship(2);
  const p2Ships = [carrier2, battleship2, cruiser2, submarine2, destroyer2];

  // auto-generate the ships for both players first
  // player1.generatePlacement(p1Ships);
  getPlayer2().gameBoard.resetBoard();
  getPlayer2().generatePlacement(p2Ships);

  // Render the board for both players
  // boardGenerator(player1);
  boardGenerator(getPlayer2());
};

const turnHandler = () => {
  activePlayer = activePlayer === player1 ? player2 : player1;
};

const player1Attack = (e) => {
  const p2_x = e.currentTarget.dataset.xaxis;
  const p2_y = e.currentTarget.dataset.yaxis;
  const shipObj = getPlayer2().gameBoard.getBoard()[p2_y][p2_x];
  if (getPlayer2().gameBoard.receiveAttack(p2_y, p2_x)) {
    let result = player2.gameBoard.getBoard()[p2_y][p2_x];
    if (result !== "miss") {
      result = shipsColor(shipObj);
    }
    cellAttacked(e, result);
  } else {
    return;
  }

  if (getPlayer2().gameBoard.checkAllSunk()) {
    notifyWinner("Player 1");
    return;
  }

  if (player2.userType === "cpu") {
    setTimeout(() => {
      cpuAttack();
    }, 1000);
  }
};

const player2Attack = (e) => {
  const p1_x = parseInt(e.currentTarget.dataset.xaxis);
  const p1_y = parseInt(e.currentTarget.dataset.yaxis);
  const shipObj = getPlayer1().gameBoard.getBoard()[p1_y][p1_x];
  if (getPlayer1().gameBoard.receiveAttack(p1_y, p1_x)) {
    let result = getPlayer1().gameBoard.getBoard()[p1_y][p1_x];
    if (result !== "miss") {
      result = shipsColor(shipObj);
    }
    cellAttacked(e, result);
  } else {
    return;
  }

  if (getPlayer1().gameBoard.checkAllSunk()) {
    notifyWinner("Player 2");
    return;
  }
};

const notifyWinner = (winner) => {
  // Emit a custom event
  const winnerEvent = new CustomEvent("gameWinner", { detail: { winner } });
  document.dispatchEvent(winnerEvent);
};

const cpuAttack = () => {
  let attackSuccess = false;

  while (!attackSuccess) {
    const randomIndexY = Math.floor(
      Math.random() * getPlayer1().getArrY().length
    );
    const randomIndexX = Math.floor(
      Math.random() * getPlayer1().getArrX().length
    );
    const y = getPlayer1().getArrY()[randomIndexY];
    const x = getPlayer1().getArrX()[randomIndexX];
    const shipObj = player1.gameBoard.getBoard()[y][x];
    if (getPlayer1().generateAttack(randomIndexY, randomIndexX)) {
      attackSuccess = true;
      let result = player1.gameBoard.getBoard()[y][x];
      if (result !== "miss") {
        result = shipsColor(shipObj);
      }
      const cell = document.querySelector(
        `.cell[data-xaxis="${x}"][data-yaxis="${y}"]`
      );
      cellAttacked(cell, result);
    }
  }

  if (getPlayer1().gameBoard.checkAllSunk()) {
    notifyWinner("Player 2");
  }
};

const boardStatus = () => {
  if (getPlayer2().userType === "cpu") {
    if (activePlayer === getPlayer1()) {
      disableBoard("player1", player2AttackHandler);
    }
  } else {
    if (activePlayer === getPlayer1()) {
      disableBoard("player1", player2AttackHandler);
      enableBoard("player2", player1AttackHandler);
    } else {
      disableBoard("player2", player1AttackHandler);
      enableBoard("player1", player2AttackHandler);
    }
  }
};

const player1AttackHandler = (e) => {
  player1Attack(e);
  turnHandler();
  boardStatus();
};

const player2AttackHandler = (e) => {
  player2Attack(e);
  turnHandler();
  boardStatus();
};

export {
  intializeBoard,
  gameStart,
  boardStatus,
  player1AttackHandler,
  player2AttackHandler,
  getPlayer1,
  getPlayer2,
  resetPlayersBoard,
  notifyWinner,
};
