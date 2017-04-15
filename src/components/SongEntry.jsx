//Each song Displayed
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';


import axios from 'axios';
import $ from 'jquery';

const SongEntry = ({ songInfo, images, addSong }) => (
  <div className="song-entry-container">
    <div className="song-entry-header">
      <h3>{songInfo.name}</h3>
    </div>
    <Row middle="xs" around="xs">
      <Col xs>
        <div>
          <img src={`${images[2].url}`}/>
        </div>
      </Col>
      <Col xs>
        <div className="song-entry-inner-details">
          {songInfo.artists.map((artist, idx) => (
            <div key={songInfo.id + idx}>{artist.name}</div>
          ))}
        </div>
        <button value={songInfo.id} onClick={addSong}>Add Song to Playlist</button>
      </Col>
    </Row>
    <Divider/>
  </div>
);


export default SongEntry