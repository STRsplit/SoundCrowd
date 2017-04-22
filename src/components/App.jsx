import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser, setUser, setVerifying } from '../actions/userActions';
import axios from 'axios';

import Login from './Login.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

import { Spinner } from 'elemental';

class App extends Component {

  componentWillMount() {
    this.props.setVerifying(true);

    this.props.verifyUser()
    .then(() => {      
      this.props.setVerifying(false);
    })
    .catch(err => console.log('App componentWillMount err: ', err));

    this.getHomeNode = this.getHomeNode.bind(this);
    this.getLoginNode = this.getLoginNode.bind(this);
  }

  getHomeNode() {
    const { verifying, loggedIn} = this.props.user;
    if (verifying) {
      return <div className="spinner-div"><Spinner size="lg" type="inverted" /></div>;
    } else {
      const location = loggedIn ? '/app' : '/login';
      return <Redirect to={ location } />;
    }
  }

  getLoginNode() {
    const { verifying, loggedIn} = this.props.user;
    if (verifying) {
      return <div className="spinner-div"><Spinner size="lg" type="inverted" /></div>;
    } else {
      return loggedIn ? <Redirect to="/app" /> : <Login />;
    }
  }

	render() {
    /* * REMOVE BEFORE PR * */
    console.log('this.props: ', this.props);

	  return ( 
      <BrowserRouter>
        <div>
        <Switch>
          <Route exact path="/" render={ this.getHomeNode }/>
          <Route exact path="/login" render={ this.getLoginNode } />
          <Route exact path="/app/playlists/:playlistId" component={ PublicRoute } />
          <Route path="/app" component={ PrivateRoute } /> 
        </Switch>
        </div>
      </BrowserRouter>
	  );
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
    setUser: user => {
      dispatch(setUser(user));
    },
    setVerifying: boolean => {
      dispatch(setVerifying(boolean));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
