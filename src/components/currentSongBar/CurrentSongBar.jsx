import React, { Component, PropTypes } from 'react';
import axios from 'axios';

import { Row, Col } from 'elemental';
import { Avatar, Slider, FlatButton, RaisedButton, Dialog, TextField } from 'material-ui/';

class CurrentSongBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      name: '',
      artist: '',
      album: '',
      duration: 0,
      progress: 0,
      isPlaying: false,
      sliderValue: 0,
      open: false
    };

    this.counter = 4999;
    /* * Need to ask a more proper name for this. * */
    this.roomId = '';

    this.convertToTime = this.convertToTime.bind(this);
    this.autoUpdateInfo = this.autoUpdateInfo.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setRoomId = this.setRoomId.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
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
      this.counter = 0;
      this.updateInfo();
    } else {
      let { progress, duration, isPlaying } = this.state;
      progress += 1000;
      if(progress >= duration) {
        this.counter = 0;
        this.updateInfo();
      } else if(isPlaying) {
        this.setState({progress: progress, sliderValue: progress/duration});        
      }
    }
  }

  updateInfo() {
    axios.get('/api/spotify/current_song')
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
    })
    .catch(err => {
      console.log('CurrentSongBar error: ', err);
      /* * REDIRECTS TO LOGIN IF API CALL THROWS AN ERROR * */
      this.context.router.history.push('/login');
    });    
  }

  convertToTime(millisec) {
    const date = new Date(millisec);
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds();
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  /* * Need to ask a more proper name for this. * */
  setRoomId(e, newValue) {
    this.roomId = newValue;
  }
  /* * Need to ask a more proper name for this. * */
  joinRoom() {
    this.setState({open: false}, () => {
      console.log('this.props', this.props);
      this.context.router.history.push(`/playlist/${this.roomId}`);
      this.props.getPlaylistTracks(this.roomId);
    });
  }

  render() {
    const { image, name, artist, album, duration, progress, isPlaying, sliderValue, open } = this.state;
    const avatar = image ? <Avatar src={image} size={40} style={style.avatar} /> : <Avatar size={40} style={style.avatar} >S</Avatar>;
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}  
        onTouchTap={this.handleClose}
        style={style.button}
      />,
      <RaisedButton
        label="Join"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.joinRoom}
        style={style.button}
      />,
    ];

    return(
      <div className="csb-container">
        <Row className="3-col-row">
          <Col sm="1/3">          
            <div className="csb-album-image">
              { avatar }
            </div>
            <div className="csb-song-info">
              <span className="csb-song-name">{name}</span><br/>
              <span>{`${artist}  ${album}`}</span>
            </div>
          </Col>
          <Col sm="1/3"> 
            <span>{this.convertToTime(progress)}</span>
            <span style={style.duration}>{this.convertToTime(duration)}</span>
            <Slider sliderStyle={style.slider} value={sliderValue} />
          </Col>
          <Col sm="1/3">
            <RaisedButton label="Join A Room" primary={true} onTouchTap={this.handleOpen} />
            <Dialog
              actions={actions}
              modal={false}
              open={open}
              onRequestClose={this.handleClose}
              contentStyle={style.dialog}
            >
              <TextField hintText="Enter playlist id." fullWidth={true} onChange={this.setRoomId} />
            </Dialog>
          </Col>
        </Row>
      </div>  
    );
  }
}

CurrentSongBar.contextTypes = {
  router: PropTypes.object
}

export default CurrentSongBar;

const style = {
  avatar: {
    margin: '5px'
  },
  duration: {
    float: 'right'
  },
  slider: {
    margin: '0 auto', 
    width: '98%'
  },
  button: {
    margin: '5px'
  },
  dialog: {
    width: '500px'
  }
};
