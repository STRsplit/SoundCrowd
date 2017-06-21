//Each song Displayed
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import Button from 'muicss/lib/react/button';



import axios from 'axios';
import $ from 'jquery';

const SongEntry = ({ songInfo, images, addSong }) => (
  <div>
    <div className="track-main-container">
      <div>
      </div>
      <div className="track-dual-container">
        <div className="track-vote-container">
          <div className="track-vote-container-inner">     
            <Button className="track-add-song-button" 
            variant="fab" value={songInfo.id} 
            onClick={addSong}>+</Button>
          </div>
        </div>
        <div className="track-song-details">
          <div className="track-song-details-inner flexbox-container container">
            <div className="track-image box">
              <img src={`${images[2].url}`}/>
            </div>
            <div className="song-entry-header">
              <h3>{songInfo.name}</h3>
              <div className="song-entry-inner-details">
                {songInfo.artists.slice(0, 3).map((artist, idx) => (
                  <div key={songInfo.id}>{artist.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  </div>
)

export default SongEntry