import React, { Component } from 'react';
import { publicRoutes } from './routes';
import RouteContainer from './RouteContainer.jsx';

class PublicRoute extends Component {

  render() {
    return (
      <div><RouteContainer routes={ publicRoutes } /></div>
    );
  }

}

export default PublicRoute;
