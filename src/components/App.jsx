import React from 'react';
import axios from 'axios';
import { BrowserRouter, browserHistory, Route, Redirect, Match, Link, Switch, Path } from 'react-router-dom';

import NavBar from './Navbar.jsx';
import Playlists from './Playlists.jsx';
// import { Grid, Row, Col } from 'react-flexbox-grid';
// import { Container, Row, Col } from 'muicss/lib/react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import NewPlaylist from './NewPlaylist.jsx';
import Playlist from './Playlist.jsx';
import Login from './Login.jsx';
import PlaylistRoute from './routes/PlaylistRoute.jsx';

import SearchContainer from './SearchContainer.jsx'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.setMood = this.setMood.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.findPlaylist = this.findPlaylist.bind(this);
  }

  setMood(e) {
    this.props.handleMood(e.target.value);
  }

  setActivity(e) {
    this.props.handleActivity(e.target.value);
  }

	findPlaylist() {
		var count;
		axios.get('/playlist')
		.then((result) => {
			count = result.data.length + 1;
			// this.setState({
   //      name: result.data.user
			// });s
			axios.post('/create', {number: count});
		});
	}

	/*<Link id='currentPlaylist' to='/playlists'>Use My Playlist</Link>*/

	render() {
    console.log('APP stats', this.props.stats)
     if (!this.props.stats.loggedIn) {
      return (
        <Login />
      )
    }
	  return ( 
    <BrowserRouter>
	  	<div>
		  	<div>
		  		<div>
		  			<NavBar logout={this.props.logout} name={this.props.name}/>
		  		</div>
		  	</div>
        <div>
		  	<Container className="main-app-container" fluid={true}>
	        <Row className>

		        <Col className="layout-column column-left" md="1">md-4</Col>
		        <Col className="layout-column column-mid" xs="18" md="9">
		          <div className="inner-app-container">
				  			<div className="main-middle-column">
          					<Route exact path="/app" render={() => (
                      <div>
                        <div>
                          <Playlists setPlaylist={this.props.setPlaylist} />
                        </div>
                        <div>
                          <div>
                              <div><Link to='/app'>Use My Playlist</Link></div>
                              <div><Link onClick={this.findPlaylist} to='/app/new-playlist'>Get Suggested Playlist</Link></div>
                          </div>
                            <div>
                              <h4>Mood</h4>
                                <select id="mood" onChange={this.setMood}>
                                  <option value="Choose One">Choose One</option>
                                  <option value="Happy">Happy</option>
                                  <option value="Calm">Calm</option>
                                  <option value="Sad">Sad</option>
                                  <option value="Focused">Focused</option>
                                  <option value="Excited">Excited</option>
                                </select>
                                <h4>Activity</h4>
                                <select id="activity" onChange={this.setActivity}>
                                  <option value="Choose One">Choose One</option>
                                  <option value="Exercising">Exercising</option>
                                  <option value="Studying">Studying</option>
                                  <option value="Partying">Partying</option>
                                  <option value="Chilling">Chilling</option>
                                  <option value="Driving">Driving</option>
                                </select>
                              </div>
                            </div>
                        </div>
                    )}/>
                    <Switch>
                    <Route exact path="/app/playlists" render={() => (<Playlist playlist={this.props.stats.playlist}/>)}/>
                    <Route path="/app/playlists/:playlistId" component={PlaylistRoute} />
                    <Route path="/app/search" render={() => (<SearchContainer addSong={this.handleSongAdd} stats={this.props.stats} />)} />
                    <Route path="/app/new-playlist" render={() => (
                      <NewPlaylist state={this.props.stats}/>
                    )}/>
                  </Switch>
                </div>
      		  	  </div>
      		  	</Col>
              <Col className="layout-column column-right" xs="18" md="2">md-4</Col>
            </Row>
	        </Container>
          </div>
		  </div>

    </BrowserRouter>
	  );
	}
}

export default App;


//                    


