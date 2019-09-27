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
      buttonAssignments: [],
      completed: [],
      matches: 0,
    };

    this.state.buttonAssignments = this.getButtonAssignments();
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

  getButtonAssignments() {
    let letters1 = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let letters2 = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let set1 = [];
    let set2 = [];

    for (let i = 0; i < 8; i++) {
      let randLetter1 = _.sample(letters1);
      let randLetter2 = _.sample(letters2);
      set1.push(randLetter1);
      set2.push(randLetter2);
      _.remove(letters1, function(i) { return i === randLetter1; });
      _.remove(letters2, function(i) { return i === randLetter2; });
    }

    console.log(set1.concat(set2));

    return set1.concat(set2);
  }


  // buttonPress(ev, id) {
  //   let lastGuess = null;
  //   let newGrid = this.state.grid;
  //   let row = parseInt(id[0],10);
  //   let column = parseInt(id[1],10);
  //   let buttonPressed = document.getElementById(id);
  //   if (this.state.lastGuess === null) {
  //     lastGuess = id;
  //     newGrid[row][column] = true;
  //   } else if (document.getElementById(this.state.lastGuess).value ===
  //             buttonPressed.value){
  //     newGrid[row][column] = true;
  //     lastGuess = null;
  //   } else {
  //     newGrid[parseInt(this.state.lastGuess[0],10)][parseInt(this.state.lastGuess[1],10)] = false;
  //   }
  //   console.log(row + " " + column);
  //   let state1 = _.assign({}, this.state, { grid: newGrid, lastGuess: lastGuess });
  //   this.setState(state1);
  // }

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

  buttonClick(letter, id) {
    let state1 = _.assign({}, this.state, {});
    if (this.state.lastGuess === null) {
      state1 = _.assign({}, this.state, {lastGuess: [id, letter]});
      this.setState(state1);
    } else {
      if (letter === this.state.lastGuess[1]) {
        let completed = this.state.completed;
        completed.push(letter);
        state1 = _.assign({}, this.state, { completed: completed,
                                            lastGuess: null });
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
          <BuildButtons root={this} low={0} high={4} />
        </div>
        <div className="column">
          <BuildButtons root={this} low={4} high={8}/>
        </div>
        <div className="column">
          <BuildButtons root={this} low={8} high={12}/>
        </div>
        <div className="column">
          <BuildButtons root={this} low={12} high={16}/>
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
  let {low} = props;
  let {high} = props;
  let lastGuess = root.state.lastGuess;
  let letters = _.slice(root.state.buttonAssignments, low, high);
  let completed = root.completed;
  // need to not have both buttons turn on at once.
  let buttons = _.map(letters, (letter, i) => {
    // if the button's ID has been matched
    if (root.state.completed.includes(letter)) {
      return(<button id={i} value={letter}
              onClick={() => root.buttonClick(letter, i)}
              key={i}>{letter}</button>);
    }

    // if the button clicked matches the last button clicked
    if (i != lastGuess) {
      return (
        <button id={i} value={letter}
              onClick={() => root.buttonClick(letter, i)}
              key={i}></button>
      );

    // default case
    } else {
      return(<button id={i} value={letter}
              onClick={() => root.buttonClick(letter, i)}
              key={i}>{letter}</button>);
    }
  });
  return buttons;
}
