import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import SearchContainer from './SearchContainer.jsx'
const styles = {
  radioButton: {
    marginTop: 16,
  },
  dialog : {
    backgroundColor: 'rgba(0, 0, 0, .5)',
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
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    const radios = [];
    for (let i = 0; i < 30; i++) {
      radios.push(
        <RadioButton
          key={i}
          value={`value${i + 1}`}
          label={`Option ${i + 1}`}
          style={styles.radioButton}
        />
      );
    }

    return (
      <div>
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          className="search-popup-modal"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <SearchContainer />
        </Dialog>
      </div>
    );
  }
}

export default FullPageSearchOverlay; 
