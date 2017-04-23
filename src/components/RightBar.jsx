import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const RightBar = (props) => (
  <div className="rightBar-container">
    <div><h2>Playlist Stats:</h2></div>
    <div>
      <div><h3>Recently Added</h3></div>
      <div><h3>Trending Songs</h3></div>
      <div><h3>Recently Played</h3></div>
    </div>

  </div>
)

export default RightBar;