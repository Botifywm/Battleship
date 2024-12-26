import "./style.css";
import {
  intializeBoard,
  gameStart,
  boardStatus,
  player1AttackHandler,
  player2AttackHandler,
  resetPlayersBoard,
} from "./gameFlow.js";

import {
  highlightCells,
  isValidPlacement,
  placeShip,
  disablePointer,
  enablePointer,
} from "./domManager.js";

const startBtn = document.querySelector(".startBtn");
const replaytBtn = document.querySelector(".replaytBtn");
const winnerBanner = document.querySelector(".winnerBanner");

const gameWrapper = () => {
  let draggedShip;
  let drop = 0;
  const boardTwo = document.querySelector(".containerP2");
  const shipTemplate = document.querySelector("#ship-container-template");
  const shipContainerClone = shipTemplate.content.cloneNode(true);
  boardTwo.appendChild(shipContainerClone);
  intializeBoard();

  // Add event Listeners to the ship images
  document.querySelectorAll(".ship").forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      draggedShip = e.target;
      e.dataTransfer.setData("shipLength", ship.dataset.length);
      e.dataTransfer.setData("shipOrient", ship.dataset.orient); // Send ship info
      document.draggedShipLength = parseInt(ship.dataset.length);
      document.draggedShipOrient = ship.dataset.orient;
    });
    const shipImg = ship.querySelector("img");
    shipImg.addEventListener("dblclick", (e) => {
      e.target.classList.toggle("vertical-img");
      ship.classList.toggle("vertical");
      if (ship.classList.contains("vertical")) {
        ship.dataset.orient = "vertical";
      } else {
        ship.dataset.orient = "horizontal";
      }
    });
  });

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    cell.addEventListener("dragenter", (e) => {
      e.preventDefault();
      const x = parseInt(e.target.dataset.xaxis);
      const y = parseInt(e.target.dataset.yaxis);

      setTimeout(() => {
        highlightCells(
          y,
          x,
          document.draggedShipLength,
          document.draggedShipOrient,
          "add"
        );
      }, 0);
    });

    cell.addEventListener("dragleave", (e) => {
      const x = parseInt(e.target.dataset.xaxis);
      const y = parseInt(e.target.dataset.yaxis);

      highlightCells(
        y,
        x,
        document.draggedShipLength,
        document.draggedShipOrient,
        "remove"
      );
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const x = parseInt(e.target.dataset.xaxis);
      const y = parseInt(e.target.dataset.yaxis);
      const shipLength = parseInt(e.dataTransfer.getData("shipLength"));
      const orient = e.dataTransfer.getData("shipOrient");

      if (isValidPlacement(y, x, shipLength, orient)) {
        placeShip(y, x, shipLength, orient, draggedShip.id);
        draggedShip.remove();
        drop++;
        highlightCells(
          y,
          x,
          document.draggedShipLength,
          document.draggedShipOrient,
          "remove"
        );
      } else {
        highlightCells(
          y,
          x,
          document.draggedShipLength,
          document.draggedShipOrient,
          "remove"
        );
        console.log("Invalid placement");
      }
    });
  });

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (drop < 5) {
      const shipsLeft = document.querySelector(".noShipsLeft");
      shipsLeft.textContent = "Please do not leave any ships behind!";
      shipsLeft.style.color = "yellowgreen";
      return;
    }
    boardTwo.innerHTML = "";

    gameStart();

    const player1DOM = document.querySelector(".containerP1");
    const player2DOM = document.querySelector(".containerP2");

    const p2Cells = player2DOM.querySelectorAll(".cell");
    p2Cells.forEach((cell) => {
      cell.addEventListener("click", player1AttackHandler);
    });

    const p1Cells = player1DOM.querySelectorAll(".cell");
    p1Cells.forEach((cell) => {
      cell.addEventListener("click", player2AttackHandler);
    });

    boardStatus(player1DOM, player2DOM);

    startBtn.style.display = "none";
    replaytBtn.style.display = "block";
  });

  document.addEventListener("gameWinner", (e) => {
    const winner = e.detail.winner;
    winnerBanner.style.display = "grid";
    winnerBanner.textContent = `${winner} wins!`;
    disablePointer();
  });
};

const gameReset = () => {
  //Reset the boards
  const boardOne = document.querySelector(".containerP1");
  const boardTwo = document.querySelector(".containerP2");
  boardOne.innerHTML = "";
  boardTwo.innerHTML = "";
  resetPlayersBoard();
  gameWrapper();
  startBtn.style.display = "block";
  replaytBtn.style.display = "none";
  winnerBanner.style.display = "none";
  enablePointer();
};

replaytBtn.addEventListener("click", gameReset);

const game = gameWrapper;
game();
