import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Keyboard from './Keyboard';

const phraseToFind="This is a test";

const initialState = {
  usedLetters: new Set(),
  counter: 0,
  wordFound: false
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {...initialState};
  }

  reset(){
    this.setState(initialState);
  }

  handleClick(character){
    // If the word is not already found
    if(this.state.wordFound){
      return;
    }

    // Get a new set from the previous state
    const usedLetters = new Set(this.state.usedLetters.values());

    // Add the new character if it's not already in the set
    let state;
    if(!usedLetters.has(character)){
      usedLetters.add(character);
      state = {
        usedLetters: usedLetters,
        wordFound: !computeDisplay(phraseToFind, usedLetters).includes('_')
      }
    }

    // Update the state
    this.setState({
      ...state,
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <span className="word-to-find">{computeDisplay(phraseToFind, this.state.usedLetters)}</span>
          </div>
          <div className="row mt-1 justify-content-center">
            <span>Counter : {this.state.counter + (this.state.wordFound ? ' Trouvé' : '')}</span>
          </div>
          <div className="row mt-2 justify-content-center">
            <Keyboard onClick={(character) => this.handleClick(character)}/>
          </div>
        </div>
      </div>
    );
  }
}

// TODO : Add PropTypes

/**
 * Display the mask for the word to find
 * @param {the phrase to display} phrase 
 * @param {the letter already tried} usedLetters 
 */
function computeDisplay(phrase, usedLetters) {
  return phrase.toUpperCase().replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

export default App;
