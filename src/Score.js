import React from 'react'
import PropTypes from 'prop-types'

const Score = ({score}) => (
    <div className="row mt-2 justify-content-center">
        <div className="col-sm-3 justify-content-center">
        <span>Score : {score}</span>
        </div>
    </div>   
);

Score.propTypes = {
    score: PropTypes.number.isRequired
}

export default Score