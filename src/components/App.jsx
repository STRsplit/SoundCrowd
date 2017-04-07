import React from 'react';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
	  return (
	  	<div>
	  	  <h1>Welcome To So Me</h1>
	  	  {this.props.children}
		  </div>	
	  );
	}
}

export default App;