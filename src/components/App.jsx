import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import NewPlaylist from './NewPlaylist.jsx';
import Playlist from './Playlist.jsx';
import Login from './Login.jsx';
import SearchContainer from './SearchContainer.jsx'; 
import NavBar from './Navbar.jsx';
import RightBar from './RightBar.jsx';
import Playlists from './Playlists.jsx';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class App extends Component {

	render() {
	  return ( 
    <BrowserRouter>
      <Switch>
      <Route exact path="/login" component={Login} />
	  	<div>
	  		<NavBar logout={this.props.logout} name={this.props.name}/>
        <div>
		  	<Container className="main-app-container" fluid={true}>
	        <Row>
		        <Col className="layout-column column-left" md="2"></Col>
		        <Col className="layout-column column-mid" xs="18" md="7">
		          <div className="inner-app-container">
				  			<div className="main-middle-column">
        					<Route exact path="/app"  component={Playlists}/>
                  <Switch>
                    <Route exact path="/app/playlists" render={() => (<Playlist playlist={this.props.stats.playlist}/>)}/>
                    <Route path="/app/playlists/:playlistId" component={Playlist} />
                    <Route path="/app/search" render={() => (<SearchContainer addSong={this.handleSongAdd} stats={this.props.stats} />)} />
                    <Route path="/app/new-playlist" component={NewPlaylist} />
                  </Switch>
                </div>
      		  	  </div>
      		  	</Col>
              <Col className="layout-column column-right" xs="0" md="3"><RightBar /></Col>
            </Row>
          </Container>
        </div>
		  </div>
      </Switch>
    </BrowserRouter>
	  );
	}
}

export default App;
