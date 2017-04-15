import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './Navbar.jsx';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	playlists: []
    }
    this.setMood = this.setMood.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);
    this.findPlaylist = this.findPlaylist.bind(this);
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      console.log('get playlist response ', res);

      this.setState({ playlists: playlists });
    })
    .catch(err => {
      // handle error and display appropriate message
      console.log(err);
    });
  }

  setMood(e) {
    this.props.handleMood(e.target.value);
  }

  setActivity(e) {
    this.props.handleActivity(e.target.value);
  }

  setPlaylist(playlistId) {
    this.props.setPlaylist(playlistId);
  }

	findPlaylist() {
		var count;
		axios.get('/playlist')
		.then((result) => {
			count = result.data.length + 1;
			// this.setState({
   //      name: result.data.user
			// });
			axios.post('/create', {number: count});
		});
	}

	/*<Link id='currentPlaylist' to='/playlists'>Use My Playlist</Link>*/

	render() {
	  return (
	  	<div>
		  	<div>
		  		<div>
		  			<NavBar logout={this.props.logout} name={this.props.name}/>
		  		</div>
		  	</div>
		  	<Container fluid={true}>
	        <Row className>
		        <Col className="layout-column column-left" xs="0" md="1"></Col>
		        <Col className="layout-column column-mid" xs="11" md="8">
		          <div className="main-container">
				  			<div className="main-middle-column">
						  	  <h1>Welcome To So Me</h1>
						  	  {this.props.children}
						  	  <Link id='newPlaylist' to='/new-playlist' onClick={this.findPlaylist}>Get Suggested Playlist</Link>
						  	  <div id='mood'>
						  	  <div id='moodLabel'>Mood</div>
					  	  	<select id="moodMenu" onChange={this.setMood}>
						  	    <option value="Choose One">Choose One</option>
						  	    <option value="Happy">Happy</option>
						  	    <option value="Calm">Calm</option>
						  	    <option value="Sad">Sad</option>
						  	    <option value="Focused">Focused</option>
						  	    <option value="Excited">Excited</option>
						  	  </select>
						  	  </div>
						  	  <div id='activity'>
						  	  <div id='activityLabel'>Activity</div>
						  	  <select id="activityMenu" onChange={this.setActivity}>
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
				  		<div id='playlist-container'>
					      <div>Playlists</div>
					      {this.state.playlists.map(playlist => 
				          <div key={playlist.id}>
					          <img src=""/>
					          <Link to="/tracks" onClick={() => this.setPlaylist(playlist.id)}>
					            {playlist.name}
					          </Link>
					        </div>
					      )}
					    </div>
				  	</Col>
		        <Col className="layout-column column-right" xs="5" md="3"></Col>
	        </Row>
	      </Container>
		  </div>	
	  );
	}
}

export default App;
