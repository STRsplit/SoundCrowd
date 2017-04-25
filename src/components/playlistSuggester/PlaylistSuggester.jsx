import React, { Component } from 'react';
import axios from 'axios';
import keys from '../../config/keys.js';
import { connect } from 'react-redux';
import { setFilters } from '../../actions/filtersActions';

import { Button } from 'elemental';
import { Spinner } from 'elemental';
import TextField from 'material-ui/TextField';

class PlaylistSuggester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMood: false,
      showActivity: false,
      mood: 'Choose One',
      activity: 'Choose One',
      error: false
    }
    this.playlistName = '';

    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.findPlaylist = this.findPlaylist.bind(this);
    this.setMood = this.setMood.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.toggleMood = this.toggleMood.bind(this);
    this.toggleActivity = this.toggleActivity.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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
    if (e.target.id !== 'mood-menu' && this.state.showMood === true) {
      this.toggleMood();
    }
    if (e.target.id !== 'activity-menu' && this.state.showActivity === true) {
      this.toggleActivity();
    }
  }

  render() {
    return (
      <div id="recommended-container">    
        <h2>Get Suggested Playlist</h2> 
        <TextField hintText="Name" onChange={this.setPlaylistName} />  
        <div id="preferences">
          <div id="mood">
            <h3 id="mood-label">Mood</h3>
            <div id="mood-container">
            <button id="mood-button" onClick={this.toggleMood}>{this.state.mood}</button>
            {this.state.showMood ? <div id="mood-menu">
              <div onClick={this.setMood}>Happy</div>
              <div onClick={this.setMood}>Calm</div>
              <div onClick={this.setMood}>Sad</div>
              <div onClick={this.setMood}>Focused</div>
              <div onClick={this.setMood}>Excited</div>
            </div> : null}
            </div>
          </div>
          <div id="activity">
            <h3 id="activity-label">Activity</h3>
            <div id="activity-container">
            <button id="activity-button" onClick={this.toggleActivity}>{this.state.activity}</button>
            {this.state.showActivity ? <div id="activity-menu">
              <div onClick={this.setActivity}>Exercising</div>
              <div onClick={this.setActivity}>Studying</div>
              <div onClick={this.setActivity}>Partying</div>
              <div onClick={this.setActivity}>Chilling</div>
              <div onClick={this.setActivity}>Driving</div>
            </div> : null}
            </div>
          </div>
        </div>
        <div>                    
          <div id="recommended-link" onClick={this.findPlaylist}>
            <Button type="primary"><span>Create</span></Button>
          </div>
          {this.state.error ? <div className="recommended-error">
            Select mood and activity before creating playlist
          </div> : null}
        </div>
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