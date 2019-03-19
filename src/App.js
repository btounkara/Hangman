import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Keyboard from './Keyboard';

const wordsToFind = [
  'All day i dream about sports',
  'Nike',
  'Motorcycle',
  'One Piece'
];

const initialState = {
  usedLetters: new Set(),
  counter: 0,
  wordFound: false
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...initialState,
      indexWordToFind : 0
    };
  }

  reset(){
    this.setState({
      ...initialState, 
      indexWordToFind: this.state.indexWordToFind < wordsToFind.length -1 ? this.state.indexWordToFind + 1 : 0
    });
  }

  handleClick(character){
    const { wordFound, usedLetters, counter, indexWordToFind } = this.state;
    
    // If the word is not already found
    if(wordFound){
      return;
    }

    // Get a new set from the previous state
    const newUsedLetters = new Set(usedLetters.values());

    // Add the new character if it's not already in the set
    let newState;
    if(!newUsedLetters.has(character)){
      newUsedLetters.add(character);
      newState = {
        usedLetters: newUsedLetters,
        wordFound: !computeDisplay(wordsToFind[indexWordToFind], newUsedLetters).includes('_')
      }
    }

    // Update the state
    this.setState({
      ...newState,
      counter: counter + 1
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <span className="word-to-find">
              {computeDisplay(wordsToFind[this.state.indexWordToFind], this.state.usedLetters)}
            </span>
          </div>
          <div className="row mt-1 justify-content-center">
            <span>Letters tried : {this.state.counter}</span>
          </div>
          <div className="row mt-2 justify-content-center">
            <Keyboard 
              onClick={(character) => this.handleClick(character)}
              usedLetters={this.state.usedLetters}
            />
          </div>
          
          {this.state.wordFound && 
            <div className="mt-2">
              <button type="button" 
                className="btn btn-outline-primary"
                onClick={() => this.reset()}
              >
                Play again
              </button>
            </div>}
        </div>
      </div>
    );
  }
}

/**
 * Display the mask for the word to find
 * @param {the phrase to display} phrase 
 * @param {the letter already tried} usedLetters 
 */
function computeDisplay(phrase, usedLetters) {
  if(!usedLetters){
    return phrase;
  }

  return phrase.toUpperCase().replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

export default App;
