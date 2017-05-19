import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilters } from '../../actions/filtersActions';
import { TextField, Dialog, RaisedButton } from 'material-ui/';
import style from '../../styles/additionalStyles-css.js';

import { Button } from 'elemental';

class PlaylistSuggester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMood: false,
      showActivity: false,
      mood: 'Choose One',
      activity: 'Choose One',
      error: false,
      open: false
    }
    this.playlistName = '';

    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.findPlaylist = this.findPlaylist.bind(this);
    this.setMood = this.setMood.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.toggleMood = this.toggleMood.bind(this);
    this.toggleActivity = this.toggleActivity.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.closeMenu, false);
  }

  componentWillUnmount() {
    document.addEventListener('click', this.closeMenu, false);  
  }

  findPlaylist() {
    if (this.state.mood === 'Choose One' || this.state.activity === 'Choose One') {
      this.setState({error: true});
    } else {
      this.props.loading();
      var mood = this.state.mood;
      var activity = this.state.activity;
      var playlistName = this.playlistName;
      axios.post('/api/spotify/playlists', { 
        mood,
        activity,
        playlistName
      }) 
      .then(res => {
        var id = res.data;
        this.props.methods.history.push(`/playlist/${id}`);
      })
      .catch(err => console.log(err));
    }
  }

  setPlaylistName(event, newValue) {
    this.playlistName = newValue;
  }

  setMood(e) {
    this.setState({
      mood: e.target.textContent
    });
    this.toggleMood();
  }

  setActivity(e) {
    this.setState({
      activity: e.target.textContent
    });
    this.toggleActivity();
  }

  toggleMood() {
    this.setState({
      showMood: !this.state.showMood
    });
  }

  toggleActivity() {
    this.setState({
      showActivity: !this.state.showActivity
    });
  }

  closeMenu(e) {
    if ((e.target.className !== 'option' && e.target.id !== 'mood-button') && this.state.showMood === true) {
      this.toggleMood();
    }
    if ((e.target.className !== 'option' && e.target.id !== 'activity-button') && this.state.showActivity === true) {
      this.toggleActivity();
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }


  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleClose}
        style={style.plButton}
        disableFocusRipple={true}
        disableTouchRipple={true}
      />,
      <RaisedButton
        label="Create Playlist"
        keyboardFocused={false}
        onTouchTap={this.findPlaylist}
        style={style.plButton}
        disableFocusRipple={true}
        disableTouchRipple={true}
      />,
    ];
    return (
      <div>
        <RaisedButton disableTouchRipple={true} className="main-button" label="Get Suggested Playlist" onTouchTap={this.handleOpen} />
        <Dialog
          title="Get Suggested Playlist"
          actions={actions}
          className="playlist-suggester-container"
          modal={false}
          open={this.state.open}
          contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          bodyClassName="dialog-body"
        >
          <div id="recommended-container">    
            <TextField underlineFocusStyle={style.focusTextField} hintText="Name" onChange={this.setPlaylistName} />  
            <div id="preferences">
              <div id="mood">
                <h3 id="mood-label">Mood</h3>
                <div id="mood-container">
                <button id="mood-button" onClick={this.toggleMood}>{this.state.mood}</button>
                {this.state.showMood ? <div id="mood-menu">
                  <div className="option" onClick={this.setMood}>Happy</div>
                  <div className="option" onClick={this.setMood}>Calm</div>
                  <div className="option" onClick={this.setMood}>Sad</div>
                  <div className="option" onClick={this.setMood}>Focused</div>
                  <div className="option" onClick={this.setMood}>Excited</div>
                </div> : null}
                </div>
              </div>
              <div id="activity">
                <h3 id="activity-label">Activity</h3>
                <div id="activity-container">
                <button id="activity-button" onClick={this.toggleActivity}>{this.state.activity}</button>
                {this.state.showActivity ? <div id="activity-menu">
                  <div className="option" onClick={this.setActivity}>Exercising</div>
                  <div className="option" onClick={this.setActivity}>Studying</div>
                  <div className="option" onClick={this.setActivity}>Partying</div>
                  <div className="option" onClick={this.setActivity}>Chilling</div>
                  <div className="option" onClick={this.setActivity}>Driving</div>
                </div> : null}
                </div>
              </div>
            </div>
            <div>
              {this.state.error ? <div className="recommended-error">
                Select mood and activity before creating playlist
              </div> : null}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: filters => {
      dispatch(setFilters(filters));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSuggester);
