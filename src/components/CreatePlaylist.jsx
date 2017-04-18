import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'elemental';

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: '',
      activity: ''
    };
  }

  createPlaylist() {
    axios.post('/setPreferences', {
      mood: this.state.mood,
      activity: this.state.activity
    })
    .then(() => {
      axios.get('/getCategory')
      .then(res => {
        console.log('playlist id', res.data.link.slice(-22));
        // this.setState({
        //   href: result.data.link
        // });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setMood(e) {
    this.setState({ mood: e.target.value });
  }

  setActivity(e) {
    this.setState({ activity: e.target.value });
  }  

  render() {
    return (
      <div>
        <h4>Mood</h4>
        <select id="mood" onChange={this.setMood.bind(this)}>
          <option value="Choose One">Choose One</option>
          <option value="Happy">Happy</option>
          <option value="Calm">Calm</option>
          <option value="Sad">Sad</option>
          <option value="Focused">Focused</option>
          <option value="Excited">Excited</option>
        </select>
        <h4>Activity</h4>
        <select id="activity" onChange={this.setActivity.bind(this)}>
          <option value="Choose One">Choose One</option>
          <option value="Exercising">Exercising</option>
          <option value="Studying">Studying</option>
          <option value="Partying">Partying</option>
          <option value="Chilling">Chilling</option>
          <option value="Driving">Driving</option>
        </select>
        <Link to="/app/newplaylist">
          <Button type="primary"><span>Get Recommended Playlist</span></Button>
        </Link>
      </div>
    )
  }
}

export default CreatePlaylist;