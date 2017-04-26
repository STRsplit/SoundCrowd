import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App.jsx';

import '../node_modules/elemental/less/elemental.less';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

require("!style-loader!css-loader!sass-loader!./styles/sass/all.scss");

class Main extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Provider store={store} >
            <App />
          </Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}
  
ReactDOM.render(<Main />, document.getElementById('app'));