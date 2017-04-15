import React, { Component } from 'react';
import axios from 'axios';
import login from './Login.jsx';
import { Link, Redirect} from 'react-router-dom';

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
              <Col xs></Col>
              <Col xs>
                <div><Link to='/app/search'>Search</Link></div>
                <div><Link to='/app/playlists'>Use My Playlist</Link></div>
                <div><Link to='/app/new-playlist'>Get Suggested Playlist</Link></div>
                <div onClick={this.props.logout}><Link to="/login">Logout</Link></div>
              </Col>
            </Row>
          </Grid>
      </div>
    )
  }
}

export default Navbar;