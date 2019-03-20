import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({value, used, onClick}) => (
  <button type="button"
    className={`btn btn-${used ? 'outline-secondary' : 'dark'} mr-1 mb-1`}
    onClick={() => onClick(value)}
  >
    {value}
  </button>
);  

Letter.propTypes = {
  value: PropTypes.string.isRequired,
  used: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Letter
