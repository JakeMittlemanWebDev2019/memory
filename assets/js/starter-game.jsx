import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import '../css/app.css';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel} />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      completed: [],
      skeleton: [" "," "," "," "," "," "," "," ",
                " "," "," "," "," "," "," "," ",],
      freeze: false,
      clicks: 0,
    };

    this.channel.join()
                .receive("ok", this.onJoin.bind(this))
                .receive("error", resp => {console.log(resp);});
  }

  onJoin({game}) {
    this.setState(game);
  }

  update({game}) {
    let lastGuess = game.lastGuess;
    let lastGuess2 = game.lastGuess2;
    if (lastGuess[1] != lastGuess[2] &&
        lastGuess.length > 0 && lastGuess2.length > 0) {
      let newSkel = this.state.skeleton;
      newSkel[game.lastGuess[0]] = " ";
      newSkel[game.lastGuess2[0]] = " ";
      let state1 = _.assign({}, game, {freeze: true});
      let state2 = _.assign({}, game, {lastGuess: [], lastGuess2: [],
                                      skeleton: newSkel});
      this.setState(state1);
      setTimeout(() => this.setState(state2),1000);
    } else {
      this.setState(game);
    }
  }

  resetGame() {
    this.channel.push("reset").receive("ok", this.update.bind(this));
  }

  buttonClick(letter, id) {
    this.channel.push("click", { i: id })
                .receive("ok", this.update.bind(this));
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
  let letters = _.slice(root.state.skeleton, low, high);
  let buttons = _.map(letters, (letter, i) => {
    // if we're in the middle of a timeout
    // remove the onClick methods
    if (root.state.freeze) {
      // if you've matched it, display the letter
      // and disable the button
      if (root.state.completed.includes(letter)) {
        return (<button id={ids[i]} value={letter} disabled
          onClick={() => root.buttonClick(letter, ids[i])}
          key={ids[i]}><p>{letter}</p></button>);

        // otherwise just display the current letter
      } else {
        return (<button id={ids[i]} value={letter}
          key={ids[i]}><p>{letter}</p></button>);
      }
    }
    // otherwise if we've completed it then
    // disble the button
    else if (root.state.completed.includes(letter)) {
      return (<button id={ids[i]} value={letter} disabled
        onClick={() => root.buttonClick(letter, ids[i])}
        key={ids[i]}><p>{letter}</p></button>);
    }
    return (<button id={ids[i]} value={letter}
      onClick={() => root.buttonClick(letter, ids[i])}
      key={ids[i]}><p>{letter}</p></button>);
  });
  return buttons;
}
