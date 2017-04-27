import React, { Component, PropTypes } from 'react';

import { RaisedButton, Dialog, TextField } from 'material-ui/';

class JoinRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.playlistId = '';

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
    this.playlistId = newValue;
  }
  
  joinPlaylist() {
    this.setState({open: false}, () => {
      this.context.router.history.push(`/playlist/${this.playlistId}`);
      this.props.getPlaylistTracks(this.playlistId);
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleClose}
        style={style.button}
      />,
      <RaisedButton
        label="Join"
        keyboardFocused={true}
        onTouchTap={this.joinPlaylist}
        style={style.button}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Join" onTouchTap={this.handleOpen} style={style.joinRoomButton} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={style.dialog}
        >
          <TextField hintText="Enter room code." fullWidth={true} onChange={this.setPlaylistId} />
        </Dialog>
      </div>
    );
  }

}

JoinRoom.contextTypes = {
  router: PropTypes.object
}

export default JoinRoom;

const style = {
  button: {
    margin: '5px'
  },
  dialog: {
    width: '500px'
  }
};