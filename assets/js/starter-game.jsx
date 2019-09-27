import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import '../css/app.css';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastGuess: null,
      buttonAssignments: // array mix function
      completed: [],
      matches: 0,
    };
  }

  resetGame(ev) {
    let state1 = _.assign({}, this.state, { lastGuess: null, matches: 0, })
    let buttons = document.getElementsByTagName('button');
    buttons = Array.from(buttons);
    buttons.forEach(function (b){
      if (b.id != "reset") {
        b.querySelector('p').style.visibility = "hidden";
      }
    });
    this.setState(state1);
  }


  buttonPress(ev, id) {
    let lastGuess = null;
    let newGrid = this.state.grid;
    let row = parseInt(id[0],10);
    let column = parseInt(id[1],10);
    let buttonPressed = document.getElementById(id);
    if (this.state.lastGuess === null) {
      lastGuess = id;
      newGrid[row][column] = true;
    } else if (document.getElementById(this.state.lastGuess).value ===
              buttonPressed.value){
      newGrid[row][column] = true;
      lastGuess = null;
    } else {
      newGrid[parseInt(this.state.lastGuess[0],10)][parseInt(this.state.lastGuess[1],10)] = false;
    }
    console.log(row + " " + column);
    let state1 = _.assign({}, this.state, { grid: newGrid, lastGuess: lastGuess });
    this.setState(state1);
  }

  checkEndgame() {
    let gameState = this.state.grid;
    let isOver = true;
    for (var i = 0; i < gameState.length; i++) {
      for (var j = 0; j < gameState[0].length; j++) {
        isOver = isOver && gameState[i][j];
      }
    }
    return isOver;
  }

  buttonClick(i) {
    let thisButton = document.getElementById(i);
    let lastButton = document.getElementById(this.state.lastGuess);
    let state1 = _.assign({}, this.state, {});
    if (this.state.lastGuess === null) {
      state1 = _.assign({}, this.state, {lastGuess: i});
      this.setState(state1);
    } else {
      if (thisButton.value === lastButton.value) {
        let completed = this.state.completed;
        completed.push(thisButton.value);
        state1 = _.assign({}, this.state, {completed: completed});
      }
      else {
        state1 = _.assign({}, this.state, {lastGuess: null});
      }
      this.setState(state1);
    }
  }



  render() {
    let resetButton = <button>DoesNothing</button>;

    return (
    <div className="wrapper">
      <div className="row">
        <div className="column">
          {resetButton}
        </div>
      </div>
      <div className="row">
        <div className="column">
          <BuildButtons root={this} lastGuess={this.state.lastGuess}
          low={1} high={5} />
        </div>
        <div className="column">
          <BuildButtons root={this} lastGuess={this.state.lastGuess}
          low={5} high={9}/>
        </div>
        <div className="column">
          <BuildButtons root={this} lastGuess={this.state.lastGuess}
          low={9} high={13}/>
        </div>
        <div className="column">
          <BuildButtons root={this} lastGuess={this.state.lastGuess}
          low={13} high={17}/>
        </div>
      </div>
    </div>);
  }
}

function returnRandomNums(low, high) {
  let nums = []

  for (let i = 0; i < 5; i++) {
    let val = _.random(low, high);

    while (nums.includes(val)) {
      val = _.random(low, high);
    }
    nums.push(val)
  }
  return nums
}

function BuildButtons(props) {
  let {root} = props;
  let {lastGuess} = props;
  let {low} = props;
  let {high} = props;
  let nums = _.range(low, high);
  let completed = root.completed;
  let letter = "A";
  // need to not have both buttons turn on at once.
  let buttons = _.map(nums, (i) => {
    // if the button's ID has been matched
    if (root.state.completed.includes(letter)) {
      return(<button id={i} value={letter} onClick={() => root.buttonClick(i)} key={i}>{letter}</button>);
    }

    // if the button clicked matches the last button clicked
    if (i != lastGuess) {
      return (
        <button id={i} value={letter} onClick={() => root.buttonClick(i)} key={i}></button>
      );

    // default case
    } else {
      return(<button id={i} value={letter} onClick={() => root.buttonClick(i)} key={i}>{letter}</button>);
    }
  });
  return buttons;
}
