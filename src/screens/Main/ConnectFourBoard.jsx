import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./styles.css";

import { EMPTY, RED, BLACK } from "./constants";

export default class ConnectFourBoard extends PureComponent {
  static propTypes = {
    grid: PropTypes.array,
    playPiece: PropTypes.func
  };

  renderCell = cellValue => {
    if (cellValue === RED) {
      return (
        <span role="img" aria-label="red-piece" className="piece red-piece">
          🔴
        </span>
      );
    } else if (cellValue === BLACK) {
      return (
        <span role="img" aria-label="black-piece" className="piece black-piece">
          ⚫
        </span>
      );
    } else {
      return (
        <span role="img" aria-label="empty-piece" className="piece empty-piece">
          ⚪
        </span>
      );
    }
  };

  render() {
    return (
      <div className="connect-four-board">
        {this.props.grid.map((row, rowIdx) => (
          <div className="connect-four-row" key={rowIdx}>
            {row.map((cell, columnIdx) => (
              <div
                className="connect-four-cell"
                key={columnIdx}
                onClick={() => {
                  this.props.playPiece(columnIdx);
                }}
              >
                {this.renderCell(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
