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
      // should be [id, letter]
      // or null
      lastGuess: [],
      lastGuess2: [],
      buttonAssignments: [],
      completed: [],
      freeze: false,
      clicks: 0,
    };

    this.state.buttonAssignments = this.getButtonAssignments();
  }

  resetGame() {
    let buttonAssignments = this.getButtonAssignments();
    let state1 = _.assign({}, this.state, { lastGuess: [],
                                        lastGuess2: [],
                                        buttonAssignments: buttonAssignments,
                                        completed: [],
                                        clicks: 0, })
    this.setState(state1);
  }

  getClicks() {
    return this.state.clicks;
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
    // this prevents against clicking the same button
    // twice
    if (id != this.state.lastGuess[0]) {
      let clicks = this.state.clicks + 1;
      let state1 = _.assign({}, this.state, {});

      // if this is your first click of a pair of two tiles
      if (this.state.lastGuess.length === 0) {
        state1 = _.assign({}, this.state, {lastGuess: [id, letter],
                                            clicks: clicks});
        this.setState(state1);

      // otherwise:
      } else {
        // if you made a match
        if (letter === this.state.lastGuess[1]) {
          // push the shared title letter to the completed array
          let completed = this.state.completed;
          completed.push(letter);
          state1 = _.assign({}, this.state, { completed: completed,
                                              lastGuess: [],
                                              lastGuess2: [],
                                              clicks: clicks });
          this.setState(state1);
        }

        // otherwise, set the
        else {
          // state where we reveal the second button
          state1 = _.assign({}, this.state, { lastGuess2: [id, letter],
                                              clicks: clicks,
                                              freeze: true });

          let state2 = _.assign({}, this.state, { lastGuess: [],
                                                  lastGuess2: [],
                                                  clicks: clicks,
                                                  freeze: false});

          this.setState(state1);
          // attribution: https://tinyurl.com/y5stx57r
          setTimeout(() => this.setState(state2),1000);
        }
      }
    }
  }



  render() {
    let clicks = this.getClicks();
    return (
    <div className="wrapper">
      <div className="row">
        <div className="column">
          <button onClick={this.resetGame.bind(this)}>Reset Game</button>
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
      <div>
        <p id="numClicks" ><b>Number of clicks: {clicks}</b></p>
      </div>
    </div>);
  }
}

function BuildButtons(props) {
  let {root} = props;
  let {low} = props;
  let {high} = props;
  let lastGuess = root.state.lastGuess;
  let lastGuess2 = root.state.lastGuess2;
  let ids = _.range(low, high);
  let letters = _.slice(root.state.buttonAssignments, low, high);
  let completed = root.completed;
  // need to not have both buttons turn on at once.
  let buttons = _.map(letters, (letter, i) => {
    // if the button's ID has been matched
    if (root.state.completed.includes(letter)) {
          return (<button id={ids[i]} value={letter} disabled
              key={ids[i]}><p>{letter}</p></button>);

    // if the tile has been guessed/clicked
    } else if (ids[i] === lastGuess[0] || ids[i] === lastGuess2[0]) {
      // if freeze, no clickable event
      if (root.state.freeze) {
        return (<button id={ids[i]} value={letter}
          key={ids[i]}><p>{letter}</p></button>);
      } else {
        return (<button id={ids[i]} value={letter}
          onClick={() => root.buttonClick(letter, ids[i])}
          key={ids[i]}><p>{letter}</p></button>);
      }
    // default case
    } else {
      if (root.state.freeze) {
        return (<button id={ids[i]} value={letter}
              key={ids[i]}><p style={{visibility: "hidden"}}>{letter}</p>
              </button>);
      } else {
        return (<button id={ids[i]} value={letter}
              onClick={() => root.buttonClick(letter, ids[i])}
              key={ids[i]}><p style={{visibility: "hidden"}}>{letter}</p>
              </button>);
      }
    }
  });
  return buttons;
}
