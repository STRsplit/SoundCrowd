import React, { Component } from 'react';
import ErrorModal from 'material-ui/Snackbar';

class VoteErrorPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { open, message } = this.props;
    return (
      <div>
        <ErrorModal
          className="playlist-vote-error-popup"
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}
export default VoteErrorPopup;
