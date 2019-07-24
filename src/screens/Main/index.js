import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import ConnectFourBoard from "./ConnectFourBoard";
import { NUM_ROWS, NUM_COLUMNS, RED, BLACK, EMPTY } from "./constants";


const PLAYER_NAME = {
  [RED]: <span className="player player-red">Red</span>,
  [BLACK]: <span className="player player-black">Black</span>
};

const GameStatus = ({ gameOver, currentPlayer, restart }) => (
  <div className="status">
    {gameOver ? (
      <div>
        <div>Game Over</div>
        <button className="btn btn-light btn-lg" onClick={restart}>
          Restart
        </button>
      </div>
    ) : (
      <span>Current Player: {PLAYER_NAME[currentPlayer]}</span>
    )}
  </div>
);

class Main extends PureComponent {
  state = {
    currentPlayer: RED,
    grid: this.getBlankGrid(),
    playing: true
  };

  playPiece = columnIdx => {
    this.setState(prevState => {
      for (let i = NUM_ROWS - 1; i >= 0; i--) {
        if (prevState.grid[i][columnIdx] === EMPTY) {
          const newGrid = prevState.grid.slice(0);
          newGrid[i] = newGrid[i].slice(0);
          newGrid[i][columnIdx] = prevState.currentPlayer;
          return {
            grid: newGrid,
            currentPlayer: prevState.currentPlayer === RED ? BLACK : RED
          };
        }
      }
    });
  };

  checkGameEnd = () => {};

  restart = () => {
    this.setState({
      grid: this.getBlankGrid()
    });
  };

  getBlankGrid() {
    return Array(NUM_ROWS)
      .fill(null)
      .map(() => Array(NUM_COLUMNS).fill(EMPTY));
  }

  render() {
    return (
      <div>
        <ConnectFourBoard grid={this.state.grid} playPiece={this.playPiece} />
        <GameStatus
          gameOver={!this.state.playing}
          currentPlayer={this.state.currentPlayer}
          restart={this.restart}
        />
      </div>
    );
  }
}

export default Main;
