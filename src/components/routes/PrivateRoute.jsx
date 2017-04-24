import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser, setVerifying } from '../../actions/userActions';

import Playlists from '../Playlists.jsx';
import Playlist from '../Playlist.jsx';
import SearchContainer from '../SearchContainer.jsx'; 
import NavBar from '../Navbar.jsx';
import RightBar from '../RightBar.jsx';
import NewPlaylist from '../NewPlaylist.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Spinner } from 'elemental';

class PrivateRoute extends Component {

  componentWillMount() {
    this.props.verifyUser()
    .then(() => {      
      this.props.setVerifying(false); //CHANGE THE NAMING ON THIS
    })
    .catch(err => console.log('App componentWillMount err: ', err));
  }

  render() {
    let Node;
    const { pathname } = this.props.location;
    const { verifying, loggedIn} = this.props.user;
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
                      <Route exact path="/" component={ Playlists } />
                      <Route path="/search" component={ SearchContainer } />
                      <Route path="/new-playlist" component={ NewPlaylist } />
                      <Route path="/playlist/:playlistId" component={ Playlist } />
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

    if (verifying) {
      Node =  <div className="spinner-div"><Spinner size="lg" type="inverted" /></div>;
    } else if (loggedIn){
      Node = privateRoute;      
    } else {
      const location = pathname.includes('/playlist/') ? `/public${ pathname }` :'/login';
      Node = <Redirect to={ location } />;
    }
    
    return (<div>{ Node }</div>);

  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyUser: () => {
      return dispatch(verifyUser());
    },
    setVerifying: boolean => {
      dispatch(setVerifying(boolean));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
