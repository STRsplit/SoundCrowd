import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NewPlaylist from '../NewPlaylist.jsx';
import Playlist from '../Playlist.jsx';
import SearchContainer from '../SearchContainer.jsx'; 
import NavBar from '../Navbar.jsx';
import RightBar from '../RightBar.jsx';
import Playlists from '../Playlists.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class PrivateRoute extends Component {

  render() {
    /* * REMOVE BEFORE PR * */
    // console.log('this.props: ', this.props);

    const { loggedIn } = this.props.user;
    const privateRoute = 
      ( 
        <BrowserRouter>
        <div>
          <NavBar />
          <Container className="main-app-container" fluid={true}>
            <Row>
              <Col className="layout-column column-left" md="2"></Col>
              <Col className="layout-column column-mid" xs="18" md="7">
                <div className="inner-app-container">
                  <div className="main-middle-column">
                    <Switch>
                      <Route exact path="/app" component={ Playlists } />
                      <Route path="/app/playlists/:playlistId" component={ Playlist } />
                      <Route path="/app/search" component={ SearchContainer } />
                      <Route path="/app/new-playlist" component={ NewPlaylist } />
                    </Switch>
                  </div>
                </div>
              </Col>
              <Col className="layout-column column-right" xs="18" md="3"><RightBar /></Col>
            </Row>
          </Container>
        </div>
        </BrowserRouter>
      );
    
    return (
      <div>
        { loggedIn ? privateRoute : <Redirect to="/login" /> }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(PrivateRoute);
