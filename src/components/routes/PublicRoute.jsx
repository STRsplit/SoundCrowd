import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../Navbar.jsx';
import Playlist from '../Playlist.jsx';
import SearchContainer from '../SearchContainer.jsx'; 
import RightBar from '../RightBar.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class PublicRoute extends Component {

  render() {
    // TODO: ADD LOGIN REDIRECT

    return (
      <BrowserRouter basename="/public" >
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
                    <Route path="/search" component={ SearchContainer } />
                    <Route path="/playlist/:playlistId" component={ Playlist } />
                  </Switch>
                </div>
              </div>
            </Col>
            <Col className="layout-column column-right" xs="18" md="3"><RightBar /></Col>
          </Row>
        </Container>
          </div>
      </div>
      </BrowserRouter>
    );
  }

}

export default PublicRoute;
