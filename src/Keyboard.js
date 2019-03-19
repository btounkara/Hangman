import React, { Component } from 'react'
import Letter from './Letter';
import PropTypes from 'prop-types'

const Keyboard = ({onClick}) => (
    <div>
        <div className="row justify-content-center">
            <div className="btn-group" role="group" aria-label="First group of letters">
                <Letter character='A' onClick={onClick}/>
                <Letter character='B' onClick={() => onClick('B')}/>
                <Letter character='C' onClick={() => onClick('C')}/>
                <Letter character='D' onClick={() => onClick('D')}/>
                <Letter character='E' onClick={() => onClick('E')}/>
                <Letter character='F' onClick={() => onClick('F')}/>
                <Letter character='G' onClick={() => onClick('G')}/>
                <Letter character='H' onClick={() => onClick('H')}/>
                <Letter character='I' onClick={() => onClick('I')}/>
                <Letter character='J' onClick={() => onClick('J')}/>
                <Letter character='K' onClick={() => onClick('K')}/>
                <Letter character='L' onClick={() => onClick('L')}/>
                <Letter character='M' onClick={() => onClick('M')}/>
            </div>
        </div>
        <div className="row mt-1 justify-content-center">
            <div className="mt-2 btn-group" role="group" aria-label="First group of letters">
                <Letter character='N' onClick={() => onClick('N')}/>
                <Letter character='O' onClick={() => onClick('O')}/>
                <Letter character='P' onClick={() => onClick('P')}/>
                <Letter character='Q' onClick={() => onClick('Q')}/>
                <Letter character='R' onClick={() => onClick('R')}/>
                <Letter character='S' onClick={() => onClick('S')}/>
                <Letter character='T' onClick={() => onClick('T')}/>
                <Letter character='U' onClick={() => onClick('U')}/>
                <Letter character='V' onClick={() => onClick('V')}/>
                <Letter character='W' onClick={() => onClick('W')}/>
                <Letter character='X' onClick={() => onClick('X')}/>
                <Letter character='Y' onClick={() => onClick('Y')}/>
                <Letter character='Z' onClick={() => onClick('Z')}/>
            </div>
        </div>
    </div>
);

Keyboard.propTypes = {
    onClick: PropTypes.func.isRequired
}
export default Keyboard;