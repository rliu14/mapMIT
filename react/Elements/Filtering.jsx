import React, { Component } from 'react';
import { render } from 'react-dom';

class Filtering extends Component {
  constructor(props){ 
    super(props);
    this.state = {
    };
  }
  
  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <div id="filter"></div>
    )
  }
}

export default Filtering;