import React, { Component } from 'react';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';

import { Spinner } from 'elemental';

import Paper from 'material-ui/Paper';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      loaded: false
    };
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      console.log('res.data', res.data);
      this.setState({ playlists, loaded: true });
    })
    .catch(err => {
      // handle error and display appropriate message
      console.log(err);
    });
  }

  setPlaylist(playlistId) {
    this.props.setPlaylist(playlistId);
  }

  render() {
    const userPlaylists = this.state.playlists.map(playlist => {
    return (
      <Link key={playlist.id} style={style.link} to={`/app/playlists/${playlist.id}`} onClick={() => this.setPlaylist(playlist.id)}>      
      <div className="playlists-single-container">        
        <Paper zDepth={5} >
          <img src={playlist.images[0].url} style={style.image} />            
        </Paper> 
        <div className="playlists-single-details">
          <h3 className="playlists-h3" >{playlist.name}</h3>
          <hr className="playlists-hr" />
        </div>
      </div>
      </Link> 
      )
    });

    return (
      <div>
        <hr />
        <h2>PLAYLISTS</h2>        
        <div>
          { this.state.loaded ? userPlaylists : <Spinner size="lg" />  }
        </div>
      </div>
    );
  }
}

export default Playlists;

const style = {
  image: {
    width: '200px',
    height: '200px',
    horizontalAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  }
};

/*



//
<div>{userPlaylists}</div>
<div>{ this.state.loaded ? userPlaylists : <Spinner />  }</div>

//v2

render() {
    const userPlaylists = this.state.playlists.map(playlist => {
    return (
      <Container fluid={true} style={style.container} >
      <Row key={playlist.id} style={style.playlist} >
        <Link to={`/app/playlists/${playlist.id}`} onClick={() => this.setPlaylist(playlist.id)}>
          <Col md="3" style={style.playlists} >                    
            <Paper style={style.paper} zDepth={5} >
              <img src={playlist.images[0].url} style={style.image} />
            </Paper>
          </Col>
        </Link>
        <Col md="9">
          Playlist Details
          {playlist.name}
        </Col>
      </Row>  
      </Container>    
      )
    });

    return (
      <div>
        <hr />
        <h2>Playlists:</h2>        
        <div>
          { this.state.loaded ? userPlaylists : <Spinner size="lg" />  }
        </div>
      </div>
    );
  }

  //


//ORIG
  render() {
    const userPlaylists = this.state.playlists.map(playlist => {
    return (
      <div key={playlist.id}>
        <img src=""/>
        <Link to={`/app/playlists/${playlist.id}`} onClick={() => this.setPlaylist(playlist.id)}>
          {playlist.name}
        </Link>
      </div>
      )
    })

    return (
      <div>
        <div><Link to="/app/search">Search</Link></div>
        <div>
          <h2>Playlists:</h2>
          <div>{ this.state.loaded ? userPlaylists : <Spinner size="lg" />  }</div>
        </div>
      </div>
    )
  }









*/





