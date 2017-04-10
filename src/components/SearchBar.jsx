import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import { Form, Input, Textarea, Button } from 'muicss/react';
// import { Button, Alert, Spinner } from 'elemental' 


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
    const { text, handleChange, handleSearch, handleSelect, selectedOption } = this.props
    return (
      <div>
      <div>
       <Form>
        <legend>Title</legend>
        <Input hint="Input 1" />
        <Input hint="Input 2" />
        <Textarea hint="Textarea" />
        <Button variant="raised">Submit</Button>
      </Form>
      </div>
        <form>
          <input type="text" default="search for a song" onChange={handleChange} value={text}></input>
          <br />
          <br />
          <label>Song Title: <input type="radio" onClick={handleSelect} value="track" ref="song" name="searchfilter" checked={selectedOption === 'track'}/></label>
          <br />
           <label>Artist Name: <input type="radio" onClick={handleSelect} value="artist" ref="artist" name="searchfilter" checked={selectedOption === 'artist'}/></label>
           <br />
           <label>Album Title: <input type="radio" onClick={handleSelect} value="album" ref="album" name="searchfilter" checked={selectedOption === 'album'}/></label>
           <br />
          <br />
          <button onClick={this.handleClick}>Search Spotify</button>
          </form>
      </div>
    )
  }
}

export default SearchBar;