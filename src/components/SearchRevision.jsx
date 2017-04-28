import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import SearchContainer from './SearchContainer.jsx'
const styles = {
  dialog : {
    backgroundColor: 'rgba(0, 0, 0, .8)',
  }
};

/**
 * Dialog content can be scrollable.
 */
class FullPageSearchOverlay extends Component {
  constructor(props){
    super(props);
      this.state = {
        open: false,
      };
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  handleOpen () {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
        className="search-button"
      />,
    ];

    return (
      <div>
        <RaisedButton className="search-modal-button" label="Search" onTouchTap={this.handleOpen} />
        <div className="search-modal-container">
        <Dialog
          title="Add a Song from Spotify"
          actions={actions}
          className="search-popup-modal"
          modal={false}
          repositionOnUpdate={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
          bodyStyle={{padding: '0 2%'}}
          style={{paddingTop: 10, height: '100vh'}}
        >
          <SearchContainer />
        </Dialog>
        </div>
      </div>
    );
  }
}

export default FullPageSearchOverlay; 
