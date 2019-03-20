import React, { Component } from 'react'
import Letter from './Letter';
import PropTypes from 'prop-types'

const firstGroupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M'];
const secondGroupLetters = ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class Keyboard extends Component{

    renderLetter = (character, index) => <Letter 
        key={index}
        value={character}
        used={this.letterIsUsed(character)}
        onClick={this.props.onClick}
    />;

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="btn-group" role="group" aria-label="First group of letters">
                        {firstGroupLetters.map(this.renderLetter)}
                    </div>
                </div>
                <div className="row mt-1 justify-content-center">
                    <div className="mt-2 btn-group" role="group" aria-label="First group of letters">
                        {secondGroupLetters.map(this.renderLetter)}
                    </div>
                </div>
            </div>
        );
    }

    letterIsUsed(character){
        return new Set(this.props.usedLetters.values()).has(character);
    };

}

Keyboard.propTypes = {
    onClick: PropTypes.func.isRequired,
    usedLetters: PropTypes.array.isRequired
}
export default Keyboard;