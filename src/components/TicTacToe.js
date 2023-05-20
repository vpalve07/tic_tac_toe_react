import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] === '' && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      checkWinner(newBoard, currentPlayer);

      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

      if (newBoard.indexOf('') === -1 && !winner) {
        // Draw condition
        setWinner('draw');
      }
    }
  };

  const checkWinner = (board, player) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index) => {
    return (
      <div
        className={`cell ${board[index]}`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((cell, index) => (
          <React.Fragment key={index}>{renderCell(index)}</React.Fragment>
        ))}
      </div>
    );
  };

  const renderWinnerMessage = () => {
    if (winner === 'draw') {
      return (
        <div className="winner-message">
          <p>It's a draw!</p>
          <button onClick={resetGame}>Reset</button>
        </div>
      );
    } else if (winner) {
      return (
        <div className="winner-message">
          <p>{`Player ${winner} wins!`}</p>
          <button onClick={resetGame}>Reset</button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      {renderBoard()}
      {renderWinnerMessage()}
    </div>
  );
};

export default TicTacToeGame;