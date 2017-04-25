import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser, setVerifying } from '../../actions/userActions';
import { privateRoutes } from './routes.jsx';

import RouteContainer from './RouteContainer.jsx';

import { Spinner } from 'elemental';

class PrivateRoute extends Component {

  componentWillMount() {
    this.props.verifyUser()
    .then(() => {      
      this.props.setVerifying(false);
    })
    .catch(err => console.log('PrivateRoute > componentWillMount err: ', err));
  }

  render() {
    let Node;
    const { pathname } = this.props.location;
    const { verifying, loggedIn } = this.props.user;

    if (verifying) {
      Node =  <div className="spinner-div"><Spinner size="lg" type="inverted" /></div>;
    } else if (loggedIn){
      Node = <RouteContainer routes={ privateRoutes } />;      
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
