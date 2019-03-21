import React from 'react'
import PropTypes from 'prop-types'

const BtnPlayAgain = ({display, onClick}) => (
    display && <div className="mt-2">
        <button type="button"  className="btn btn-dark" onClick={onClick}>
            Play again
        </button>
    </div>
);

BtnPlayAgain.propTypes = {
    display: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

BtnPlayAgain.defaultProps = {
    display: false
}

export default BtnPlayAgain