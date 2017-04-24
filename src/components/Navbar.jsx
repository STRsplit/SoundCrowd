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
  // TODO: ADD LOGIN REDIRECT
  
  render() {
    const privateNavItems = (
      <div>
        <Link to="/" style={style.link}><MenuItem><div>Home</div></MenuItem></Link>
        <Link to="/search" style={style.link}><MenuItem><div>Search</div></MenuItem></Link>
        <Link to="/login" style={style.link}  onClick={this.props.logoutUser}><MenuItem><div>Logout</div></MenuItem></Link>
        <Link to="/aboutus" style={style.link}><MenuItem><div>About Us</div></MenuItem></Link>
      </div>
    );
    const publicNavItems = (
      <div>
        <Link to="/login" style={style.link}  onClick={this.props.setShowLogin} ><MenuItem><div>Login</div></MenuItem></Link>
        <Link to="/search" style={style.link}><MenuItem><div>Search</div></MenuItem></Link>
        <Link to="/aboutus" style={style.link}><MenuItem><div>About Us</div></MenuItem></Link>
      </div>
    );
    const NavItems = this.props.user.loggedIn ? privateNavItems : publicNavItems;

    return (
      <div className="nav-container">
      <div>
       <AppBar className='main-navigation-site'
          title="SoundCrowd"
          onRightIconButtonTouchTap={ this._toggleNav } 
          iconElementLeft={<IconButton><UpDown /></IconButton>}
          iconElementRight={
            <IconMenu
              listStyle={ style.menu }
              iconButtonElement={<IconButton><Menu /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            { NavItems }
            </IconMenu>
          }
        />
        </div>
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
    width: '200px'
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center',
    margin: '0 auto'
  }
};
