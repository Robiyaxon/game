import { checkWinner } from "./useGameLogic";

const gamePatterns = {
  winner_x: {
    row0: [
      ["x", "x", "x"],
      ["o", "o", null],
      ["o", null, null]
    ],
    row1: [
      ["o", "o", null],
      ["x", "x", "x"],
      ["o", null, null]
    ],
    row2: [
      ["o", "o", null],
      ["o", null, null],
      ["x", "x", "x"]
    ],
    col0: [
      ["x", "o", "o"],
      ["x", "o", null],
      ["x", null, null]
    ],
    col1: [
      ["o", "x", "o"],
      ["o", "x", null],
      ["null", "x", null]
    ],
    col2: [
      ["o", "o", "x"],
      ["o", null, "x"],
      ["null", null, "x"]
    ],
    dia1: [
      ["x", null, null],
      ["o", "x", null],
      ["o", null, "x"]
    ],
    dia2: [
      [null, null, "x"],
      ["o", "x", null],
      ["x", null, "o"]
    ]
  }
};

describe("Game logic", () => {
  it("should detect winning row", () => {
    Object.keys(gamePatterns["winner_x"]).forEach((row) => {
      expect(checkWinner(gamePatterns["winner_x"][row])).toEqual("x");
    });
  });
});
