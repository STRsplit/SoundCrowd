import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Playlists from './components/Playlists.jsx';

import '../node_modules/elemental/less/elemental.less';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require("!style-loader!css-loader!sass-loader!./styles/sass/all.scss");

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
      name: ''
		}

    this.logout = this.logout.bind(this);
	}

	componentWillMount() {
		axios.get('/api/verify_user')
		.then(result => {
			if (result.data.login) {
				this.setState({
					loggedIn: true,
					name: result.data.name
				});
			} else {
        this.setState({loggedIn: false});
      }
		})
		.catch(err => console.log('main.js error componentDidMount: ', err));
	}

	logout() {
    axios.get('/logout')
    .catch((err) => {
      console.log(err);
    });
    this.setState({
    	loggedIn: false
    })
    this.context.router.replace('/login');
	}

  render() {
    const { loggedIn } = this.state

    return (
      <BrowserRouter>
			  <div>
        <Route exact path="app/playlists" component={Playlists}/>
        <Route exact path="/" render={() => (
            loggedIn ? <Redirect to="/app" /> : <Redirect to="/login" />
          )}/>
        <Route path="/login" render={() => (
            loggedIn ? <Redirect to="/app" /> : <Login />
          )}/>
        <Route path="/app" render={() => 
          (<App stats={this.state} logout={this.logout} />)}/>
		    </div>
      </BrowserRouter>
    )
  }
}
  
ReactDOM.render(
  <Provider store={store} >
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('app')
);

