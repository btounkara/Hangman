import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

// const Letter = ({ character, onClick }) => (
//     <button type="button" className="btn btn-dark" onClick={onClick}>{character}</button>
// )

class Letter extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      used: false
    }
  }

  render() {
    return (
    <button type="button"
     className={`btn btn-${this.state.used ? 'outline-dark' : 'dark'}`}
     onClick={() => this.handleClick()}
    >
      {this.props.character}
    </button>);
  }

  handleClick(){
    // Call parent's onClick
    this.props.onClick(this.props.character);

    if(!this.state.used){
      this.setState({
        used: true
      });
    }
  }
}

Letter.propTypes = {
  character: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Letter
