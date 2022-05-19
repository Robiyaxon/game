import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Board from "./Board";
import useGameLogic from "./useGameLogic";
export const TicTacToe = () => {
  const [table, { gameStatus, actions }] = useGameLogic();
  return (
    <>
      {!gameStatus.gameover && (
        <span>{gameStatus.currentPlayerText(gameStatus.activePlayer)}</span>
      )}
      <Board table={table} cellClick={actions.handleCellClick} />

      
      <Modal
        appElement={document.getElementById("root")}
        isOpen={gameStatus.showGameover}
        onRequestClose={actions.hideGameoverModal}
        className="madalGame"
      >
        <h1>Game over</h1>
        <h2>
          {gameStatus.winner ? `Player ${gameStatus.winner} won!` : "Draw!"}
        </h2>
        <div className="Restart">
          <Restart
            onClick={() => {
              actions.hideGameoverModal();
              actions.handleRestart();
            }}
          >
            Restart game?
          </Restart>
        </div>
      </Modal>
    </>
  );
};
const Restart = styled.button`
  outline: none;
`;
