import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";



const Square = function(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const square_values = Array(this.props.size);
    for (let i = 0; i < this.props.size; i++) {
      square_values[i] = Array(this.props.size).fill(null);
    }
    this.state = { 
      square_values: square_values,
      next: "X",
      winner: null
    };
  }

  handleClick(row_index, column_index) {
    if (this.state.square_values[row_index][column_index] == null) { // only do something if the space that was clicked is an empty square
      const square_values = this.state.square_values.slice();
      square_values[row_index][column_index] = this.state.next; // update board
      this.setState({square_values: square_values});
      this.setState({next: this.state.next === "X" ? "O" : "X"}); // change next from "X" to "O" or vice versa
      this.setState({winner: this.checkStatus(row_index, column_index)})
    }
  }

  checkStatus(row_index, column_index) {
    console.log(row_index + " " + column_index);
    return null;
  }

  renderSquare(row_index, column_index) {
    return <Square value={this.state.square_values[row_index][column_index]} onClick={() => this.handleClick(row_index, column_index)} key={[row_index, column_index]}/>;
  }

  renderRow(row_index) {
    let jsx_buffer = Array(this.props.size);
    for (let column_index = 0; column_index < this.props.size; column_index++) {
      jsx_buffer.push(this.renderSquare(row_index, column_index));
    }
    return jsx_buffer;
  }

  renderRows() {
    let jsx_buffer = Array(this.props.size);
    for (let row_index = 0; row_index < this.props.size; row_index++) {
      jsx_buffer.push(<div className="board-row" key={row_index}>{this.renderRow(row_index)}</div>);
    }
    return jsx_buffer;
  }

  render() {
    const status = this.state.status;
    return (
      <div>
        <h1 className="status">{status}</h1>
        {this.renderRows()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board size={3}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
