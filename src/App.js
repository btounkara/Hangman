import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Keyboard from './Keyboard';
import Score from './Score';
import PhraseToFind from './PhraseToFind';
import BtnPlayAgain from './BtnPlayAgain';

const WORDS = [
  'All day i dream about sports',
  'Nike',
  'Motorcycle',
  'One Piece',
  'Canada Love',
  'Paris',
  'Soda', 
  'Skirts', 
  'Deodorants',
  'Softener',
  'Laptop'
];

const GALLOWS_1 = (context) => drawLine(context, 10, 290, 290, 290);
const GALLOWS_2 = (context) => drawLine(context, 10, 10, 10, 290);
const GALLOWS_3 = (context) => drawLine(context, 10, 10, 200, 10);
const GALLOWS_4 = (context) => drawLine(context, 10, 50, 50, 10);
const GALLOWS_5 = (context) => drawLine(context, 200, 10, 200, 50);
const HEAD = (context) => {
	context.beginPath();
	context.arc(200, 70, 20, 0, 2 * Math.PI);
	context.stroke();
};
const BODY = (context) => drawLine(context, 200, 90, 200, 160);
const LEFT_LEG = (context) => drawLine(context, 200, 160, 180, 190);
const RIGHT_LEG = (context) => drawLine(context, 200, 160, 220, 190);
const LEFT_ARM = (context) => drawLine(context, 200, 120, 180, 140);
const RIGHT_ARM = (context) => drawLine(context, 200, 120, 220, 140);

const DRAW_HANGMAN_ARRAY = [GALLOWS_1, GALLOWS_2, GALLOWS_3, GALLOWS_4, GALLOWS_5, HEAD, BODY, LEFT_LEG, RIGHT_LEG, LEFT_ARM, RIGHT_ARM];

const INITIAL_STATE = {
  usedLetters: new Set(),
  score: 0,
  mistakes: 0,
  wordFound: false
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...INITIAL_STATE,
      indexWordToFind : 0
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    this.setState({
      canvasContext: context
    });
  }

  playAgain(){
    this.refs.canvas.width = this.refs.canvas.width;

    this.setState({
      ...INITIAL_STATE, 
      indexWordToFind: this.state.indexWordToFind < WORDS.length -1 ? this.state.indexWordToFind + 1 : 0
    });
  }

  handleClick(character){
    const { wordFound, usedLetters, score, indexWordToFind, canvasContext, mistakes} = this.state;
    
    // If the word is not already found
    if(wordFound || mistakes === DRAW_HANGMAN_ARRAY.length){
      return;
    }

    // Get a new set from the previous state
    const newUsedLetters = new Set(usedLetters.values());

    // Add the new character if it's not already in the set
    let newState;
    const hasCharacter = newUsedLetters.has(character);
    if(!hasCharacter){
      newUsedLetters.add(character);
      // Compute the new state
      newState = {
        usedLetters: newUsedLetters,
        wordFound: !computeDisplay(WORDS[indexWordToFind], newUsedLetters).includes('_')
      }
    }

    let newScore = score;
    // Draw on canvas if it is a mistake
    const isMistake = !containsCharacter(WORDS[indexWordToFind], character);
    if(isMistake){
      // Draw the hangman
      DRAW_HANGMAN_ARRAY[mistakes](canvasContext);
      // -1 if first mistake, -2 if not
      newScore -= (hasCharacter ? 2 : 1);
    } else if(!hasCharacter){
      // + 2 when a character is found
      newScore += 2;
    }

    // Update the state
    this.setState({
      ...newState,
      mistakes: isMistake ? mistakes + 1 : mistakes,
      score: newScore
    });
  }

  getInfoMsg(wordFound, lost) {
    if(wordFound){
      return {
        alertClass : 'alert-success',
        msg : 'You won'
      };
    } else if(lost){
      return {
        alertClass : 'alert-danger',
        msg : 'You lost'
      }
    } 
    
    return {
      alertClass : 'alert-secondary',
      msg : 'Try to find the word'
    }
  }

  render() {
    const {usedLetters, wordFound, score, indexWordToFind, mistakes} = this.state;
    const lost = mistakes === DRAW_HANGMAN_ARRAY.length;
    const {alertClass, msg} = this.getInfoMsg(wordFound, lost);
    const phrase = lost ? WORDS[indexWordToFind].toUpperCase() : computeDisplay(WORDS[indexWordToFind], usedLetters)
  
    return (
      <div className="App">
        <div className="container">
          {  
            <div className="row mt-2 justify-content-center">
                <div className={`alert ${alertClass} mt-2 col-sm-6`} role="alert">
                  <h2>HANGMAN</h2>
                  {msg}
                </div>
            </div>
          }
          
          <div className="row mt-2 justify-content-center">
            <canvas ref="canvas" id="canvas" width="300" height="300" />
          </div>
          
          <PhraseToFind value={phrase} />
          
          <Score score={score}/>

          <Keyboard 
            display={!wordFound && !lost}
            onClick={(character) => this.handleClick(character)}
            usedLetters={usedLetters}
          />

          <BtnPlayAgain 
            display={wordFound || lost}
            onClick={() => this.playAgain()}/>

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
  console.log(usedLetters);
  return phrase.toUpperCase().replace(/\w/g, (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

/**
 * Check if a character is inside a string
 * @param {the word} phrase 
 * @param {the character to find} character 
 */
function containsCharacter(phrase, character){
  return phrase.toUpperCase().includes(character);
}

/**
 * Draw a line
 * @param {the canvas's context to use} context 
 * @param {the stating X point} startX  
 * @param {the stating Y point} startY 
 * @param {the ending X point} endX 
 * @param {the ending Y point} endY 
 */
function drawLine(context, startX, startY, endX, endY){
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}

export default App;