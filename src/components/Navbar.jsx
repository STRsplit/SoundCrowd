import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
render() {
    return (
      <div className="nav-container">
          <Grid>
            <Row>
            <Col xs><div className='nav-container-name'>{this.props.name}</div></Col>
              <Col xs>
                <div><Link to="/app/search">Search</Link></div>
                <div><Link to='/app/playlists'>Use My Playlist</Link></div>
                <div><Link to='/app/new-playlist'>Get Suggested Playlist</Link></div>
                <div className='nav-container-logout' onClick={this.props.logout}>Logout</div>
              </Col>
              <Col xs></Col>
            </Row>
          </Grid>
      </div>
    )
  }
}

export default Navbar;