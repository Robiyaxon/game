import { useState, useEffect, useCallback } from "react";
import cloneDeep from "lodash.clonedeep";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const dim = 3;
export const checkWinner = (table) => {
  let colResult;
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
  const rowResult = checkRow(table);
  let transposedTable = [
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
  human: false, 
  ki: {
    playerLetter: "o"
  },
  training: false 
};

export default () => {
  const [table, setTable] = useState(cloneDeep(initialBoard));
  const [winner, setWinner] = useState(null);
  const [gameover, setGameover] = useState(false);
  const [round, setRound] = useState(0);
  const [activePlayer, setPlayer] = useState("x");
  const [showGameover, setShowGameover] = useState(false);
  const [gameMode, setGameMode] = useState(GAME_MODES.human ? "human" : "ki");

  const handleCellClick = (row, col) => {
    if (gameover || table[row][col] !== null) {
      return;
    }

    if (gameMode === "ki" && activePlayer === GAME_MODES.ki.playerLetter) {
      return; 
    }

    updateTable(row, col);
  };

  const getCell = (pos) => {
    const row = parseInt((pos - 1) / 3, 10); 
    return {
      row,
      col: pos - 1 - row * 3
    };
  };

  const isCellEmpty = (row, col) => table[row][col] === null;
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

      setPlayer((a) => (a === "x" ? "o" : "x")); 
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
    table, 
    {
      gameStatus: {
        activePlayer,
        currentPlayerText,
        gameMode, 
        gameover,
        round, 
        showGameover, 
        winner 
      },
      actions: {
        handleCellClick, 
        handleRestart, 
        hideGameoverModal,
        setGameMode
      }
    }
  ];
};
