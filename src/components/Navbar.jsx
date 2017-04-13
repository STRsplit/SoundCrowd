import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className='nav-container'>
        <div className='nav-container-name'>{this.props.name}</div>
        <div className='nav-container-logout' onClick={this.props.logout}>Logout</div>
      </div>
    );
  }
}

export default Navbar;