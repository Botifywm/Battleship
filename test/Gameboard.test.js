import { Gameboard } from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

const board = Gameboard();

test("Placement of the ships are at the right coordinates on the x-axis", () => {
  const board = Gameboard();
  board.placement(Ship(3), 2, 3, "x");
  expect(board.getBoard()[2][3]).not.toBe(null);
  expect(board.getBoard()[2][4]).not.toBe(null);
  expect(board.getBoard()[2][5]).not.toBe(null);
});

test("Placement of the ships are at the right coordinates on the y-axis", () => {
  const board = Gameboard();
  board.placement(Ship(3), 1, 5, "y");
  expect(board.getBoard()[1][5]).not.toBe(null);
  expect(board.getBoard()[2][5]).not.toBe(null);
  expect(board.getBoard()[3][5]).not.toBe(null);
});

test("Ships cannot be placed out of bounds", () => {
  const board = Gameboard();
  expect(board.placement(Ship(3), 0, 12, "x")).toBeFalsy();
  expect(board.placement(Ship(3), 0, 10, "x")).toBeFalsy();
  expect(board.placement(Ship(3), 10, 2, "y")).toBeFalsy();
  expect(board.placement(Ship(3), 5, -1, "y")).toBeFalsy();
});

test("receiveAttack logs miss correctly", () => {
  const board = Gameboard();
  let ship1 = Ship(3);

  board.placement(ship1, 1, 5, "y");
  board.receiveAttack(0, 0);
  expect(board.getBoard()[0][0]).toEqual("miss");

  board.receiveAttack(2, 5);
  expect(board.getBoard()[2][5]).not.toEqual(null);
});

test("returns false when the coordinates are targeted twice", () => {
  const board = Gameboard();
  let ship1 = Ship(3);
  board.placement(ship1, 1, 5, "y");
  board.receiveAttack(1, 5);
  expect(board.receiveAttack(1, 5)).toBeFalsy();
});

test("All the ships are sunk", () => {
  const board = Gameboard();
  let ship1 = Ship(3);
  board.placement(ship1, 1, 5, "y");
  board.receiveAttack(1, 5);
  board.receiveAttack(2, 5);
  board.receiveAttack(3, 5);
  expect(board.checkAllSunk()).toBeTruthy(); //passes when shipAlive in the Gameboard object is 1
});
