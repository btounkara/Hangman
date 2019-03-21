import React from 'react'
import PropTypes from 'prop-types'

const PhraseToFind = ({value}) => (
    <div className="row mt-2 justify-content-center">
        <span className="word-to-find">
            {value}    
        </span>
    </div>
);

PhraseToFind.propTypes = {
    value: PropTypes.string.isRequired
}

export default PhraseToFind