//Each song Displayed
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

const SongEntry = ({ songInfo, images, addSong }) => (
  <div className="song-entry-container">
    <div className="song-entry-header">
      <h3>{songInfo.name}</h3>
      <img src={`${images[2].url}`}/>
    </div>
    <div className="song-entry-inner-details">
      {songInfo.artists.map((artist, idx) => (
        <div key={songInfo.id + idx} ref={songInfo.id}>{artist.name}</div>
      ))}
      </div>
      <button value={songInfo.id} onClick={addSong}>Add Song to Playlist</button>
    <div>
    </div>
  </div>
);


export default SongEntry