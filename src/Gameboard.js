function Gameboard() {
  const size = 12;
  let shipAlive = 5;
  let board = matrixGen(size);
  const getBoard = () => board;
  const getSize = () => size;
  const resetBoard = () => (board = matrixGen(size));
  const placement = (Ship, y, x, orientation) => {
    const ship = Ship;
    const shipLen = ship.getLength();
    if (!validateSpace(y, x, shipLen, orientation)) {
      console.log("Placement out of bounds");
      //   throw new Error("Placement out of bounds")
      return false;
    } else {
      if (orientation === "horizontal") {
        //   endPoint = board[x][y + shipLen];
        for (let i = x; i < x + shipLen; i++) {
          board[y][i] = ship;
        }
      } else if (orientation === "vertical") {
        //   endPoint = board[x][y + shipLen];
        for (let i = y; i < y + shipLen; i++) {
          board[i][x] = ship;
        }
      }
    }
    return true;
  };
  const receiveAttack = (y, x) => {
    if (board[y][x] === "destroyed" || board[y][x] === "miss") {
      return false;
    } else if (board[y][x] === null) {
      board[y][x] = "miss";
    } else {
      if (!board[y][x].isSunk()) {
        board[y][x].hit();
        if (board[y][x].isSunk()) {
          shipAlive--;
        }
        board[y][x] = "destroyed";
      }
    }
    // console.log(board);
    return true;
  };

  const checkAllSunk = () => {
    if (shipAlive === 0) {
      return true;
    } else {
      return false;
    }
  };

  function matrixGen(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(null);
      }
      matrix.push(row);
    }
    return matrix;
  }

  function validateSpace(y, x, shipLen, orientation) {
    if (orientation === "horizontal") {
      if (x + shipLen > size) {
        return false;
      }
      for (let i = x; i < x + shipLen; i++) {
        if (board[y][i] !== null) {
          return false;
        }
      }
      return true;
    } else if (orientation === "vertical") {
      if (y + shipLen > size) {
        return false;
      }
      for (let i = y; i < y + shipLen; i++) {
        if (board[i][x] !== null) {
          return false;
        }
      }
      return true;
    }
  }

  return {
    getSize,
    getBoard,
    placement,
    receiveAttack,
    checkAllSunk,
    validateSpace,
    resetBoard,
  };
}

export { Gameboard };
