import React, { Component } from 'react'
import Letter from './Letter';
import PropTypes from 'prop-types'

const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class Keyboard extends Component{

    renderLetter = (character, index) => <Letter 
        key={index}
        value={character}
        used={this.letterIsUsed(character)}
        onClick={this.props.onClick}
    />;

    render() {
        return (
            <div className="row mt-2 justify-content-center">
                <div className="col-sm-6">
                    {letters.map(this.renderLetter)}
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
    usedLetters: PropTypes.instanceOf(Set).isRequired
}
export default Keyboard;