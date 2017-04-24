import React, { Component } from 'react';
import { publicRoutes } from './routes';
import RouteContainer from './RouteContainer.jsx';

class PublicRoute extends Component {

  render() {
    // TODO: ADD LOGIN REDIRECT
    return (
      <div><RouteContainer routes={ publicRoutes } /></div>
    );
  }

}

export default PublicRoute;
