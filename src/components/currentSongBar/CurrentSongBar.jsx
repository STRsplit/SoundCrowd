import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'elemental';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import Slider from 'material-ui/Slider';

class CurrentSongBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: './assets/images/default-albumart.png',
      name: '',
      artist: '',
      album: '',
      duration: 0,
      progress: 0,
      isPlaying: false,
      sliderValue: 0
    };

    this.counter = 4000;

    this.convertToTime = this.convertToTime.bind(this);
    this.autoUpdateInfo = this.autoUpdateInfo.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentWillMount() {
    clearInterval(this.timer);
    this.timer = setInterval(this.autoUpdateInfo, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autoUpdateInfo() {
    this.counter += 1000;
    if(this.counter >= 5000) {
      this.updateInfo();
    } else {
      let { progress, duration, isPlaying } = this.state;
      progress += 1000;
      if(progress > duration) {
        this.counter = 0;
        this.updateInfo();
      } else if(isPlaying) {
        this.setState({progress: progress, sliderValue: progress/duration});        
      }
    }
  }

  updateInfo() {
    axios.get('/api/playlist/currentsong')
    .then(result => {
      const { is_playing, progress_ms } = result.data;
      const { name, duration_ms } = result.data.item;
      const album = result.data.item.album;
      this.setState({
        image: album.images[1].url,
        name: name,
        artist: album.artists[0].name,
        album: album.name,
        duration: duration_ms,
        progress: progress_ms,
        isPlaying: is_playing,
        sliderValue: progress_ms/duration_ms
      });
      this.counter = 0;
    })
    .catch(err => console.log('CurrentSongBar error: ', err));    
  }

  convertToTime(millisec) {
    const date = new Date(millisec);
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds();
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
  }

  render() {
    const { image, name, artist, album, duration, progress, isPlaying, sliderValue } = this.state;
    return(
    <MuiThemeProvider>
    <div className="csb-container">
      <Row className="3-col-row">
        <Col sm="1/3">          
          <div className="csb-album-image">
            <Avatar src={image} size={40} style={style.avatar} />
          </div>
          <div className="csb-song-info">
            <span className="csb-song-name">{name}</span><br/>
            <span>{`${artist} - ${album}`}</span>
          </div>
        </Col>
        <Col sm="1/3"> 
          <span>{this.convertToTime(progress)}</span>
          <span style={style.duration}>{this.convertToTime(duration)}</span>
          <Slider sliderStyle={style.slider} value={sliderValue} />
        </Col>
        <Col sm="1/3">
          Search Song || Add Song Section
        </Col>
      </Row>
    </div>  
    </MuiThemeProvider>
    );
  }

}

export default CurrentSongBar;

const style = {
  avatar: {margin: '5px 10px'},
  duration: {float: 'right'},
  slider: {margin: '5px', width: '98%'}
};
