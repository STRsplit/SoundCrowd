import React, { Component } from 'react';
import axios from 'axios';

class CurrentSongBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: ''
    };

  }

  componentDidMount() {
    console.log('CurrentSongBar componentDidMount');
    axios.get('/api/playlist/currentsong')
    .then(result => {
      console.log('CurrentSongBar result: ', result);
    })
    .catch(err => console.log('CurrentSongBar error: ', err));
  }

  render() {
    return(
    <div>
      <div className="thumbnail-div">
        <img src={'this.props.currentSong.thumbnail'} />
      </div>
      <div className="song-info-div">
        <span>{'this.props.currentSong.album'}</span>
        <span>{'this.props.currentSong.title'}</span>
      </div>
      <div className="addsong-searchsong-div">
        Current Playing Song
      </div>
    </div>  
    );
  }

}

export default CurrentSongBar;

/*

<div>
  <div className="thumbnail-div">
    <img src={this.props.currentSong.thumbnail || ''} />
  </div>
  <div className="song-info-div">
    <span>{this.props.currentSong.album || ''}</span>
    <span>{this.props.currentSong.title  || ''}</span>
  </div>
  <div className="addsong-searchsong-div">
    Current Playing Song
  </div>
</div>  

*/