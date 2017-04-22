import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from '../Navbar.jsx';
import Playlist from '../Playlist.jsx';
import SearchContainer from '../SearchContainer.jsx'; 
import RightBar from '../RightBar.jsx';
import Playlists from '../Playlists.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class PublicRoute extends Component {

  render() {

    return (
      <div>
        <NavBar />
        <div>
        <Container className="main-app-container" fluid={true}>
          <Row>
            <Col className="layout-column column-left" md="2"></Col>
            <Col className="layout-column column-mid" xs="18" md="7">
              <div className="inner-app-container">
                <div className="main-middle-column">
                  <Switch>  
                    <Route path="/app/playlists/:playlistId" component={ Playlist } />
                    <Route path="/app/search" component={ SearchContainer } />
                  </Switch>
                </div>
              </div>
            </Col>
            <Col className="layout-column column-right" xs="18" md="3"><RightBar /></Col>
          </Row>
        </Container>
          </div>
      </div>
    );
  }

}

export default PublicRoute;
