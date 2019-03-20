import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({value, used, onClick}) => (
  <button type="button"
    className={`btn btn-${used ? 'outline-dark' : 'dark'}`}
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