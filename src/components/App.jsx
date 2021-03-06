import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Login from './Login.jsx';
import SearchContainer from './SearchContainer.jsx'; 
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';

class App extends Component {

	render() {
	  return (       
      <Switch>
        <Route path="/login" component={ Login } />              
        <Route path="/public" component={ PublicRoute } />
        <Route path="/" component={ PrivateRoute }/>
      </Switch>
	  );
	}
}

export default App;
