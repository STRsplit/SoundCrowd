import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import { Form, Input, Textarea, Button, Radio } from 'muicss/react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Button as ColorButton } from 'elemental';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
    event.preventDefault()
    this.props.handleSearch();
  }
  render() {
    let { stats, text, handleChange, handleSearch, handleSongAdd, handleSelect, selectedOption } = this.props
    return (
      <div>
        <div>
          <Form>
            <Row middle="xs" around="xs">
              <Col xs={3}>
                <label>Song Title: <Input type="radio" onClick={handleSelect} value="track" ref="song" name="searchfilter" checked={selectedOption === 'track'}/></label>
              </Col>
              <Col xs={3}>
                <label>Artist Name: <Input type="radio" onClick={handleSelect} value="artist" ref="artist" name="searchfilter" checked={selectedOption === 'artist'}/></label>
              </Col>
              <Col xs={3}>
                 <label>Album Title: <Input type="radio" onClick={handleSelect} value="album" ref="album" name="searchfilter" checked={selectedOption === 'album'}/></label>
              </Col>
            </Row>
            <div>
              <Row middle="xs" around="xs">
                <Col xs={8}>
                  <AutoCompleteSearch handleInput={handleChange} handleSongAdd={handleSongAdd} stats={stats} />
                </Col>
                <Col xs={4}>
                  <Button onClick={this.handleClick}>Search Spotify</Button> 
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default SearchBar;