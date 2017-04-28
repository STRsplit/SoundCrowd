import React, { Component, PropTypes } from 'react';
import axios from 'axios';


import { RaisedButton, Dialog, TextField } from 'material-ui/';
import style from '../../styles/additionalStyles-css.js';

class JoinRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: '',
      open: false,
      errorMessage: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setPlaylistId = this.setPlaylistId.bind(this);
    this.joinPlaylist = this.joinPlaylist.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  setPlaylistId(e, newValue) {
    this.setState({
      playlistId: newValue,
      errorMessage: ''
    });
  }
  
  joinPlaylist() {
    axios.get(`/api/validate/${this.state.playlistId}`)
    .then(result => { 
      if (result.data) {
        this.setState({open: false}, () => {
          this.context.router.history.push(`/playlist/${this.state.playlistId}`);
          this.props.getPlaylistTracks(this.state.playlistId);
        });
      } else {
        this.setState({errorMessage: 'Invalid room code.'});
      }
    })
    .catch(err => console.log('JoinRoom.js > validatePlaylist err: ', err));     
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleClose}
        style={style.plButton}
      />,
      <RaisedButton
        label="Join"
        keyboardFocused={false}
        onTouchTap={this.joinPlaylist}
        style={style.plButton}
      />,
    ];

    return (
      <div className="join-room-modal">
        <RaisedButton label="Join" onTouchTap={this.handleOpen} style={style.button} />
        <Dialog
          contentClassName="dialog"
          actions={actions}
          className="playlist-suggester-container"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '100%'}}
          contentClassName="dialog-content"
          bodyClassName="dialog-body"
        >

          <TextField hintText="Enter room code." underlineFocusStyle={style.focusTextField} fullWidth={true} onChange={this.setPlaylistId} errorText={this.state.errorMessage} />

        </Dialog>
      </div>
    );
  }

}

JoinRoom.contextTypes = {
  router: PropTypes.object
};

export default JoinRoom;
