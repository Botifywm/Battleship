import { Gameboard } from "./Gameboard.js";

function Player(user = "human") {
  const userType = user;
  let gameBoard = Gameboard();
  let yArr = [];
  let xArr = [];
  for (let i = 0; i < gameBoard.getSize(); i++) {
    xArr.push(i);
    yArr.push(i);
  }

  const getArrY = () => yArr;
  const getArrX = () => xArr;

  const generatePlacement = (arrOfObjects) => {
    let yArrCopy = yArr.slice();
    let xArrCopy = xArr.slice();
    arrOfObjects.forEach((ship) => {
      let notPlaced = true;
      while (notPlaced) {
        const orientation = orientationGen();
        const randomIndexY = Math.floor(Math.random() * yArrCopy.length);
        const randomIndexX = Math.floor(Math.random() * xArrCopy.length);
        if (
          gameBoard.placement(
            ship,
            yArr[randomIndexY],
            xArr[randomIndexX],
            orientation
          )
        ) {
          notPlaced = false;
        }
      }
    });
  };

  const generateAttack = (randomIndexY, randomIndexX) => {
    if (
      gameBoard.getBoard()[yArr[randomIndexY]][xArr[randomIndexX]] === null ||
      gameBoard.getBoard()[yArr[randomIndexY]][xArr[randomIndexX]] instanceof
        Object
    ) {
      gameBoard.receiveAttack(yArr[randomIndexY], xArr[randomIndexX]);
      return true;
    }
    return false;
  };
  return {
    gameBoard,
    userType,
    generateAttack,
    getArrX,
    getArrY,
    generatePlacement,
  };
}

const orientationGen = () => {
  let random = Math.round(Math.random());
  if (random < 0.5) {
    return "horizontal";
  } else {
    return "vertical";
  }
};

export { Player };
