import { Player } from "../src/Players.js";
import { Gameboard } from "../src/Gameboard.js";

// test("generates the right array for coordinates X and Y", () => {
//   const player = Player();
//   let arrayX = player.getArrX();
//   let arrayY = player.getArrY();
//   expect(arrayX).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
//   expect(arrayY).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// });

// test("generate moves removes an element from the arrays", () => {
//   const player = Player();
//   player.generateAttack();
//   player.generateAttack();
//   expect(player.getArrX().length).toBe(8);
//   expect(player.getArrY().length).toBe(8);
// });

// test("generate random moves from the created arrays without replacement", () => {
//   const player = Player();
//   const len = player.gameBoard.getSize();
//   for (let i = 0; i < len* len; i++) {
//     expect(() => player.generateMove()).not.toThrow();
//   }
// });
