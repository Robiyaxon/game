import { useState, useEffect, useCallback } from "react";
import cloneDeep from "lodash.clonedeep";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const dim = 3;
// row-wise
// col-wise
// diagonal1
// diagonal2
export const checkWinner = (table) => {
  let colResult;
  // row check
  // x x o
  // x x x => xxx
  // o x x
  // o o x
  // o o o => ooo
  const checkRow = (testTable) => {
    let testRowResult;
    for (let row of testTable) {
      const joinedRow = row.join("");
      if (joinedRow === "x".repeat(dim)) {
        // xxx
        testRowResult = "x";
      } else if (joinedRow === "o".repeat(dim)) {
        // ooo
        testRowResult = "o";
      }
      if (testRowResult) {
        break;
      }
    }

    return testRowResult;
  };

  // check row
  const rowResult = checkRow(table);
  // col check
  // transpose table --> cols are getting rows of transposed table
  // so we can do the same test
  let transposedTable = [
    // [],
    // [],
    // []
  ];
  if (!rowResult) {
    for (let row of table) {
      let colIndex = 0;
      for (let player of row) {
        if (!Array.isArray(transposedTable[colIndex]))
          transposedTable[colIndex] = [];

        transposedTable[colIndex].push(player);
        colIndex++;
      }
    }

    colResult = checkRow(transposedTable);
  }

  // check diagonals
  // x o o
  // o x o
  // o o x
  // index 00, 11, 22 --> can be calculated with a counter
  // or 02, 11, 20
  /*
  
  // 4 by 4
  // o o o x
  // o o x o
  // o x o o
  // x o o o
  
  // 03, 12, 21, 30
  // row++
  // col = max--

  // hard-coded
  const center = table[1][1];
  const dia1 = table[0][0] + center + table[2][2];
  const dia2 = table[0][2] + table[1][1] + table[2][0];*/

  const dia1 = Array.from(new Array(dim))
    .map((_, i) => table[i][i])
    .join("");
  let countDown = dim;
  const dia2 = Array.from(new Array(dim))
    .map((_, i) => table[i][--countDown])
    .join("");

  const diaBoolCheck = (letter) =>
    (dia1 === letter.repeat(dim) || dia2 === letter.repeat(dim)) && letter;
  const diaResultX = diaBoolCheck("x");
  const diaResultO = diaBoolCheck("o");
  const diaResult = diaResultX || diaResultO;

  return rowResult || colResult || diaResult;
};

const GAME_MODES = {
  human: false, // human vs. human
  ki: {
    // human vs. ki --> o for KI & human starts
    playerLetter: "o"
  },
  training: false // like human vs human but agent1 vs agent2
  // x = human
  // o = ki
};

export default () => {
  const [table, setTable] = useState(cloneDeep(initialBoard));
  const [winner, setWinner] = useState(null);
  const [gameover, setGameover] = useState(false);
  const [round, setRound] = useState(0);
  const [activePlayer, setPlayer] = useState("x");
  const [showGameover, setShowGameover] = useState(false);

  // gamemode not used yet, but we could switch between
  // human, ki basic & ki minimax (later)
  const [gameMode, setGameMode] = useState(GAME_MODES.human ? "human" : "ki");

  const handleCellClick = (row, col) => {
    if (gameover || table[row][col] !== null) {
      // already selected or game-over --> skip click
      return;
    }

    if (gameMode === "ki" && activePlayer === GAME_MODES.ki.playerLetter) {
      return; // ignore user clicks - if KI's turn
    }

    updateTable(row, col);
  };

  const getCell = (pos) => {
    // 1 2 3 4 5 6 7 8 9
    // row 0 row 1 row 2
    // 0 1 2 0 1 2 0 1 2
    // e.g. (1 - 1) / 3 = 0
    //      (2 - 1) / 3 = 0
    //      (3 - 1) / 3 = 0
    //      (4 - 1) / 3 = 1
    const row = parseInt((pos - 1) / 3, 10); // 4 --> row = 1
    return {
      row,
      col: pos - 1 - row * 3
    };
  };

  const isCellEmpty = (row, col) => table[row][col] === null;

  // simple KI - picks the first empty spot
  const firstEmptyCell = () => {
    let cell;
    for (let i = 0; i < 9; i++) {
      cell = getCell(i);
      if (isCellEmpty(cell.row, cell.col)) {
        break;
      }
    }
    return cell;
  };

  const bestSpot = firstEmptyCell;

  const handleRestart = () => {
    setTable(cloneDeep(initialBoard));
    setWinner(null);
    setPlayer("x");
    setRound(0);
    setGameover(false);
  };

  const hideGameoverModal = () => setShowGameover(false);

  const updateTable = useCallback(
    (row, col) => {
      setTable((tbl) => {
        let draft = [...tbl];
        draft[row][col] = activePlayer;
        return draft;
      });

      setPlayer((a) => (a === "x" ? "o" : "x")); // toggle player
      setRound((r) => r + 1);
    },
    [activePlayer]
  );

  useEffect(() => {
    if (round > 0) {
      const playerWon = checkWinner(table);
      if (playerWon) {
        setWinner(playerWon);
        setGameover(true);
      } else if (gameMode === "ki") {
        const isKITurn = activePlayer === GAME_MODES.ki.playerLetter;

        if (isKITurn) {
          // call KI to do it's move
          const kiClick = bestSpot();
          updateTable(kiClick.row, kiClick.col);
        }
      }
    }

    if (round >= dim * dim) {
      setGameover(true);
    }
  }, [round, table, activePlayer, bestSpot, updateTable, gameMode]);

  useEffect(() => {
    if (gameover) {
      if (winner === null) {
        // no winner = draw game
        // gameover && winner == null --> draw display
        setShowGameover(true);
        return;
      }
      setShowGameover(true);
    }
  }, [gameover, winner]);

  const currentPlayerText = (player) => {
    let playerText;

    return playerText;
  };

  return [
    table, // 2d array of the game
    {
      gameStatus: {
        activePlayer, // x or o?
        currentPlayerText,
        gameMode, // ki or human mode
        gameover,
        round, // counter of round 0,1...
        showGameover, // showing gameover modal
        winner // x or o is the winner, undefined = draw
      },
      actions: {
        handleCellClick, // update table
        handleRestart, // game restart
        hideGameoverModal,
        setGameMode
      }
    }
  ];
};
