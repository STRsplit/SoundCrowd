import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser, setShowLogin } from '../actions/userActions';

import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui/';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/svg-icons/navigation/menu';
import UpDown from 'material-ui/svg-icons/action/swap-vertical-circle';

class Navbar extends Component {

  privateNavItems() {
    return (
      <IconMenu
        className="main-menu"
        listStyle={ style.menu }
        iconButtonElement={<IconButton><Menu /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem><Link to="/" style={style.link}><div>Home</div></Link></MenuItem>
        <MenuItem><a href="https://github.com/Streed12/SoundCrowd" target="_blank" style={style.link}><div>About Us</div></a></MenuItem>
        <MenuItem><Link to="/login" style={style.link}  onClick={this.props.logoutUser}><div>Logout</div></Link></MenuItem>
      </IconMenu>
    );
  }

  publicNavItems() {
    return (
      <IconMenu
        className="main-menu"
        listStyle={ style.menu }
        iconButtonElement={<IconButton><Menu /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem><Link to="/login" style={style.link} ><div>Login</div></Link></MenuItem>
        <MenuItem><a href="https://github.com/Streed12/SoundCrowd" target="_blank" style={style.link}><div>About Us</div></a></MenuItem>
      </IconMenu>
    );
  }

  render() {
    const NavItems = this.props.user.loggedIn ? this.privateNavItems() : this.publicNavItems();

    return (
      <div className="nav-container">
        <AppBar className='main-navigation-site'
          title="SoundCrowd"
          onRightIconButtonTouchTap={ this._toggleNav } 
          iconElementLeft={<IconButton><UpDown /></IconButton>}
          iconElementRight={ NavItems }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    setShowLogin: () => {
      dispatch(setShowLogin(true));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const style = {
  menu: {
    width: '200px',
    color: 'white'
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center',
    margin: '0 auto'
  }
};
