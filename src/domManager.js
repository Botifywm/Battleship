import battleshipImage from "./shipIcons/battleship.png";
import carrierImage from "./shipIcons/carrier.png";
import destroyerImage from "./shipIcons/destroyer.png";
import cruiserImage from "./shipIcons/cruiser.png";
import submarineImage from "./shipIcons/submarine.png";
import { getPlayer1 } from "./gameFlow.js";
import { Ship } from "./Ship.js";

const shipImages = {
  battleship: battleshipImage,
  carrier: carrierImage,
  destroyer: destroyerImage,
  cruiser: cruiserImage,
  submarine: submarineImage,
};

const player1DOM = document.querySelector(".containerP1");
const player2DOM = document.querySelector(".containerP2");

const boardGenerator = (player) => {
  if (document.querySelector(".containerP1").hasChildNodes()) {
    createBoard(player, ".containerP2");
  } else {
    createBoard(player, ".containerP1");
  }
};

const createBoard = (player, container) => {
  const gameboard = document.querySelector(container);
  player.gameBoard.getBoard().forEach((row, y) => {
    row.forEach((col, x) => {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.dataset.yaxis = y;
      cell.dataset.xaxis = x;
      gameboard.appendChild(cell);
    });
  });
};

function placeShip(y, x, length, orientation, shipType) {
  // Handle game logic first creating a Ship Object when the ship is placed
  const newShip = Ship(length);
  getPlayer1().gameBoard.placement(newShip, y, x, orientation);

  // DOM changes will be made here
  const startCell = document.querySelector(
    `[data-yaxis="${y}"][data-xaxis="${x}"]`
  );

  if (startCell) {
    // Add classes to mark the cell and its occupation
    startCell.classList.add("ship-start");

    const shipImage = document.createElement("img");
    shipImage.src = shipImages[shipType]; // Replace with your ship image
    shipImage.classList.add("ship-image");
    shipImage.draggable = false; // Prevent image from being draggable

    // Append ship image to the start cell
    startCell.appendChild(shipImage);

    // Adjust the size based on orientation
    if (orientation === "horizontal") {
      // Adjust the width based on the ship's length
      const width = length * 100; // 100% width for each cell
      shipImage.style.width = `${width}%`; // Spans the width across cells
      shipImage.style.height = "100%"; // Maintain height of the cells
    } else if (orientation === "vertical") {
      // Adjust the height based on the ship's length
      const width = length * 100; // 100% width for each cell
      shipImage.style.width = `${width}%`; // Spans the width across cells
      shipImage.style.height = "100%"; // Maintain height of the cells
      shipImage.style.transform = "translate(3rem, 0) rotate(90deg)"; // Rotate to fit vertical orientation
      shipImage.style.transformOrigin = "top left";
    }
  }
}

const isValidPlacement = (y, x, length, orient) => {
  if (!getPlayer1().gameBoard.validateSpace(y, x, length, orient)) {
    return false;
  }
  for (let i = 0; i < length; i++) {
    let cell;
    if (orient === "horizontal") {
      cell = document.querySelector(
        `[data-yaxis="${y}"][data-xaxis="${x + i}"]`
      );
    } else if (orient === "vertical") {
      cell = document.querySelector(
        `[data-yaxis="${y + i}"][data-xaxis="${x}"]`
      );
    }
    if (!cell) {
      return false; // Invalid if it's outside the board or already occupied
    }
  }
  return true;
};

const shipsColor = (obj) => {
  const shipLen = obj.getLength();
  switch (shipLen) {
    case 5:
      return "len5";
    case 4:
      return "len4";
    case 3:
      return "len3";
    case 2:
      return "len2";
    default:
      return;
  }
};

const cellAttacked = (e, result) => {
  const cell = e instanceof Event ? e.currentTarget : e;
  cell.classList.add(result);
};

const enableBoard = (player, callback) => {
  if (player === "player1") {
    player1DOM.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", callback);
    });
  } else {
    player2DOM.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", callback);
    });
  }
};

const disableBoard = (player, callback) => {
  if (player === "player1") {
    player1DOM.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", callback);
    });
  } else {
    player2DOM.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", callback);
    });
  }
};

const highlightCells = (y, x, shipLength, orient, action) => {
  for (let i = 0; i < shipLength; i++) {
    let targetCell;
    if (orient === "horizontal") {
      targetCell = document.querySelector(
        `[data-yaxis="${y}"][data-xaxis="${x + i}"]`
      );
    } else if (orient === "vertical") {
      targetCell = document.querySelector(
        `[data-yaxis="${y + i}"][data-xaxis="${x}"]`
      );
    }
    if (!targetCell) break; // Prevents highlighting off-board cells
    if (action === "add") {
      targetCell.classList.add("highlight");
    } else {
      targetCell.classList.remove("highlight");
    }
  }
};

const disablePointer = () => {
  player1DOM.style.pointerEvents = "none";
  player2DOM.style.pointerEvents = "none";
};

const enablePointer = () => {
  player1DOM.style.pointerEvents = "auto";
  player2DOM.style.pointerEvents = "auto";
};

export {
  boardGenerator,
  cellAttacked,
  enableBoard,
  disableBoard,
  highlightCells,
  isValidPlacement,
  placeShip,
  shipsColor,
  disablePointer,
  enablePointer,
};
