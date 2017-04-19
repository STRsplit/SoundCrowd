import React, { Component } from 'react';
import axios from 'axios';
import keys from '../../config/keys.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilters } from '../../actions/filtersActions';

class PlaylistSuggester extends Component {

  componentWillMount() {
    this.mood = '';
    this.activity = '';
    this.location = '';
    this.weather = '';

    this.fetchFilters = this.fetchFilters.bind(this);
    this.setMood = this.setMood.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.findPlaylist = this.findPlaylist.bind(this);

    this.fetchFilters();
  }

  fetchFilters() {
    axios.get('http://ip-api.com/json')
    .then(result => {
      this.location = result['data']['city'];
      return this.location;
    })
    .then(location => {
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + keys['weather'])
      .then(result => {
        this.weather = result['data']['weather'][0]['main'];
      });
    })
    .catch(err => console.log('PlaylistSuggester.jsx error componentDidMount: ', err));
  }   

  findPlaylist() {
    this.props.setFilters({
      mood: this.mood,
      activity: this.activity,
      location: this.location,
      weather: this.weather
    });
    let count;
    axios.get('/playlist')
    .then((result) => {
      count = result.data.length + 1;
      axios.post('/create', {number: count});
    });
  }

  setMood(e) {
    this.mood = e.target.value;
  }

  setActivity(e) {
    this.activity = e.target.value;
  }

  render() {
    return (
      <div>
        <div>
          <Link to='/app/new-playlist' onClick={this.findPlaylist} >
            Get Suggested Playlist
          </Link>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => {
      dispatch(setFilters(filters));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSuggester);
