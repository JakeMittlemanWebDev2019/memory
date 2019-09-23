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
      matches: 0,
    };
  }

  // swap(_ev) {
  //   let state1 = _.assign({}, this.state, { left: !this.state.left });
  //   this.setState(state1);
  // }
  //
  // hax(_ev) {
  //   alert("hax!");
  // }

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

  buttonPress(ev) {
    // TODO: this should be "if button has been revealed"
    // =========================
    if (ev.target.querySelector('p').style.visibility === "hidden") {
      let targetP = ev.target.querySelector('p');
      let state1 = _.assign({}, this.state, {});

      // if this is first guess out of two
      if (this.state.lastGuess === null) {
        // visibility style attribution:
        // https://www.w3schools.com/jsref/prop_style_visibility.asp
        targetP.style.visibility = "visible";
        // assign the guess
        state1 = _.assign({}, this.state, { lastGuess: ev.target });
      }

      // otherwise
      else {
        targetP.style.visibility = "visible";
        // check if the two guesses match
        if (this.state.lastGuess.value === ev.target.value) {
          targetP.style.visibility = "visible";
          state1 = _.assign({}, this.state, {matches: this.state.matches + 1})
        }
        else {
          let oldButton = this.state.lastGuess;
          oldButton.querySelector('p').style.visibility = "hidden";
          targetP.style.visibility = "hidden";
          state1 = _.assign({}, this.state, { lastGuess: null });
        }
      }
      if (this.state.lastGuess != null) {
        console.log("after everything, lastGuess: " + this.state.lastGuess.id)
      } else { console.log("after everything lastGuess is null") }
      this.setState(state1);
    }
  }

  render() {
    let buttonA1 = <div className="column">
      <button id="A1" value="A" onClick={this.buttonPress.bind(this)}>
        <p style={{visibility: "hidden"}}>A1</p></button>
      </div>;
    let buttonA2 = <div className="column">
      <button id="A2" value="A" onClick={this.buttonPress.bind(this)}>
        <p style={{visibility: "hidden"}}>A2</p>
      </button>
      </div>;
    let buttonA3 = <div className="column">
      <button value = "B" onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A3</p>
      </button>
      </div>;
    let buttonA4 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonB1 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonB2 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonB3 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonB4 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;

    let buttonC1 = <div className="column">
      <button value="A" onClick={this.buttonPress.bind(this)}>
        <p style={{visibility: "hidden"}}>A1</p></button>
      </div>;
    let buttonC2 = <div className="column">
      <button value="A" onClick={this.buttonPress.bind(this)}>
        <p style={{visibility: "hidden"}}>A2</p>
      </button>
      </div>;
    let buttonC3 = <div className="column">
      <button value = "B" onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A3</p>
      </button>
      </div>;
    let buttonC4 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonD1 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonD2 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonD3 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;
    let buttonD4 = <div className="column">
      <button onClick={this.buttonPress.bind(this)}>
      <p style={{visibility: "hidden"}}>A4</p>
      </button>
      </div>;

    let resetButton = <div className="column">
      <button id="reset" onClick={this.resetGame.bind(this)}>
      <p>Reset Game</p>
      </button>
      </div>;

    return (
    <div className="wrapper">
      <div className="row">
        <div className="column">
          {resetButton}
        </div>
      </div>
      <div className="row">
        <div className="column">
          {buttonA1} {buttonB1} {buttonC1} {buttonD1}
        </div>
        <div className="column">
          {buttonA2} {buttonB2} {buttonC2} {buttonD2}
        </div>
        <div className="column">
          {buttonA3} {buttonB3} {buttonC3} {buttonD3}
        </div>
        <div className="column">
          {buttonA4} {buttonB4} {buttonC4} {buttonD4}
        </div>
      </div>
    </div>);
    // <div className="column">
    //   <div className="column">{buttonA1} {buttonA2} {buttonA3} {buttonA4}</div>
    //   <div className="column">{buttonB1} {buttonB2} {buttonB3} {buttonB4}</div>
    //   <div className="column">{buttonC1} {buttonC2} {buttonC3} {buttonC4}</div>
    //   <div className="column">{buttonD1} {buttonD2} {buttonD3} {buttonD4}</div>
    // </div>);

    // let button = <div className="column" onMouseMove={this.swap.bind(this)}>
    //   <p><button onClick={this.hax.bind(this)}>Click Me</button></p>
    // </div>;
    //
    // let blank = <div className="column">
    //   <p>Nothing here.</p>
    // </div>;
    //
    // if (this.state.left) {
    //   return <div className="column">
    //     {button}
    //     {blank}
    //   </div>;
    // }
    // else {
    //   return <div className="column">
    //     {blank}
    //     {button}
    //   </div>;
    // }
  }
}
