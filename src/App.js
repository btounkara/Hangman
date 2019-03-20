import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Keyboard from './Keyboard';

const wordsToFind = [
  'All day i dream about sports',
  'Nike',
  'Motorcycle',
  'One Piece'
];

const gallows1 = (context) => drawLine(context, 10, 290, 290, 290);
const gallows2 = (context) => drawLine(context, 10, 10, 10, 290);
const gallows3 = (context) => drawLine(context, 10, 10, 200, 10);
const gallows4 = (context) => drawLine(context, 10, 50, 50, 10);
const gallows5 = (context) => drawLine(context, 200, 10, 200, 50);
const head = (context) => {
	context.beginPath();
	context.arc(200, 70, 20, 0, 2 * Math.PI);
	context.stroke();
};
const body = (context) => drawLine(context, 200, 90, 200, 160);
const leftLeg = (context) => drawLine(context, 200, 160, 180, 190);
const rightLeg = (context) => drawLine(context, 200, 160, 220, 190);
const leftArm = (context) => drawLine(context, 200, 120, 180, 140);
const rightArm = (context) => drawLine(context, 200, 120, 220, 140);

const drawHangmanArray = [gallows1, gallows2, gallows3, gallows4, gallows5, head, body, leftLeg, rightLeg, leftArm, rightArm];

class App extends Component {

  initialState = {
    usedLetters: new Set(),
    counter: 0,
    mistakes: 0,
    wordFound: false
  };

  constructor(props){
    super(props);
    this.state = {
      ...this.initialState,
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
    this.state.canvasContext.clearRect(0, 0, 300, 300);
    this.setState({
      ...this.initialState, 
      indexWordToFind: this.state.indexWordToFind < wordsToFind.length -1 ? this.state.indexWordToFind + 1 : 0
    });
  }

  handleClick(character){
    const { wordFound, usedLetters, counter, indexWordToFind, canvasContext, mistakes} = this.state;
    
    // If the word is not already found
    if(wordFound || mistakes === drawHangmanArray.length){
      return;
    }

    // Get a new set from the previous state
    const newUsedLetters = new Set(usedLetters.values());

    // Add the new character if it's not already in the set
    let newState;
    if(!newUsedLetters.has(character)){
      newUsedLetters.add(character);
      // Compute the new state
      newState = {
        usedLetters: newUsedLetters,
        wordFound: !computeDisplay(wordsToFind[indexWordToFind], newUsedLetters).includes('_')
      }
    }

    // Draw on canvas if it is a mistake
    const isMistake = !containsCharacter(wordsToFind[indexWordToFind], character);
    if(isMistake){
      drawHangmanArray[mistakes](canvasContext);
    }

    // Update the state
    this.setState({
      ...newState,
      mistakes: isMistake ? mistakes + 1 : mistakes,
      counter: counter + 1
    });
  }

  render() {

    const {usedLetters, wordFound, counter, indexWordToFind, mistakes} = this.state;
    const lost = mistakes === drawHangmanArray.length;

    return (
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <canvas ref="canvas" id="canvas" width="300" height="300" />
          </div>
          <div className="row justify-content-center">
            <span className="word-to-find">
              {computeDisplay(wordsToFind[indexWordToFind], usedLetters)}
            </span>
          </div>
          <div className="row mt-1 justify-content-center">
            <div className="col-6 justify-content-center">
              <span>Lives : {drawHangmanArray.length - mistakes}</span>
            </div>
            <div className="col-6 justify-content-center">
              <span>Trials : {counter}</span>
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <Keyboard 
              onClick={(character) => this.handleClick(character)}
              usedLetters={usedLetters}
            />
          </div>

          {
            lost && <div className="mt-2">You lost</div>
          }

          {
            (wordFound || lost) && 
            <div className="mt-2">
              <button type="button" 
                className="btn btn-outline-primary"
                onClick={() => this.playAgain()}
              >
                Play again
              </button>
            </div>
          }
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
  return phrase.toUpperCase().replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
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