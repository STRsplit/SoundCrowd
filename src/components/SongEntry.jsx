//Each song Displayed
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

const SongEntry = ({ songInfo, images, addSong }) => (
  <div>
  <div>
  <h2>{songInfo.name}</h2>
  <img src={`${images[2].url}`}/>
  </div>
    <div>
      
      <ul>
      {songInfo.artists.map((artist, idx) => (
        <li key={idx}>{artist.name}</li>
      ))}
      </ul>
      <button value={songInfo.id} onClick={addSong}>Add Song to Playlist</button>
    </div>
    <div>
    </div>
  </div>
);


export default SongEntry