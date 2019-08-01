import React from 'react';
// import './styles.scss';
// import styles from './styles.css';

// var css = require("css!./style.css");
// @import 'style.css' => require('./style.css')

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: '',
    };

    // Bind play function to App component
    this.play = this.play.bind(this);
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    const board = [];
    for (let r = 0; r < 6; r++) {
      const row = [];
      for (let c = 0; c < 7; c++) { row.push(null); }
      board.push(row);
    }

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      message: '',
    });
  }

  togglePlayer() {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }

  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      const board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }

      // Check status of board
      const result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true, message: 'Player 1 wins!' });
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true, message: 'Player 2 wins!' });
      } else if (result === 'draw') {
        this.setState({ board, gameOver: true, message: 'Draw game.' });
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c]
            && board[r][c] === board[r - 2][c]
            && board[r][c] === board[r - 3][c]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1]
            && board[r][c] === board[r][c + 2]
            && board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1]
            && board[r][c] === board[r - 2][c + 2]
            && board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1]
            && board[r][c] === board[r - 2][c - 2]
            && board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }

  checkAll(board) {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    return (
      <>
        <div id="sizer">

          <div id="swap-zone"><input id="username" placeholder="Name" />
            <button id="start">Start</button>
          </div>

          <div id="current-turn"><h2></h2></div>

          <div id="game-div">

            <div id="player1">
              <h3 id="player1-name">Player1</h3>
              <ul>
              </ul>
              <div id="player1-chosen"></div>
              <div className="outcomes">
                <div className="outcome-trackers" id="player1-wins"></div>
                <div className="outcome-trackers" id="player1-losses"></div>
              </div>
            </div>

            <div id="player2">
              <h3 id="player2-name">Player2</h3>
              <ul>
              </ul>
              <div id="player2-chosen"></div>
              <div className="outcomes">
                <div className="outcome-trackers" id="player2-wins"></div>
                <div className="outcome-trackers" id="player2-losses"></div>
              </div>
            </div>

          </div>

        </div>
        <br></br>
        <div className="button" onClick={() => { this.initBoard(); }}>New Game!!!</div>
        <table>
          <thead />
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>

        <p className="message">{this.state.message}</p>

        <div id="chat">
          <div id="chat-messages"></div>
          <div id="chat-bar">
            <input id="chat-input" />
            <button id="chat-send">Send</button>
          </div>
        </div>
      </>
    );
  }
}

// Row component
const Row = ({ row, play }) => (
  <tr>
    {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
  </tr>
);

const Cell = ({ value, columnIndex, play }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }

  return (
    <td>
      <div className="cell" onClick={() => { play(columnIndex); }}>
        <div className={color} />
      </div>
    </td>
  );
};

export default Main;
