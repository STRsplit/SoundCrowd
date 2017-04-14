import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import { Form, Input, Textarea, Button } from 'muicss/react';
import { Button as ColorButton } from 'elemental';
import AutoCompleteSearch from './Autocomplete.jsx';
import AccordionTest from './AccordionTest.jsx';

// import Button from 'muicss/lib/react/button.js';
// import Container from 'muicss/lib/react/container.js';


class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    this.props.handleSearch();
  }
  render() {
    let { stats, text, handleChange, handleSearch, handleSongAdd, handleSelect, selectedOption } = this.props
    return (
      <div>
        <div>
        <div>
        <AutoCompleteSearch handleInput={handleChange} handleSongAdd={handleSongAdd} stats={stats} />
        </div>
          <Form>
            <br />
            <br />
            <label>Song Title: <Input type="radio" onClick={handleSelect} value="track" ref="song" name="searchfilter" checked={selectedOption === 'track'}/></label>
             <label>Artist Name: <Input type="radio" onClick={handleSelect} value="artist" ref="artist" name="searchfilter" checked={selectedOption === 'artist'}/></label>
             <label>Album Title: <Input type="radio" onClick={handleSelect} value="album" ref="album" name="searchfilter" checked={selectedOption === 'album'}/></label>
            <br />
            <button onClick={this.handleClick}>Search Spotify</button>
           
          </Form>
        </div>
      </div>
    )
  }
}

export default SearchBar;