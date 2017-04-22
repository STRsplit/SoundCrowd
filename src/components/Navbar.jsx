import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui/';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/svg-icons/navigation/menu';
import UpDown from 'material-ui/svg-icons/action/swap-vertical-circle';

class Navbar extends Component {
  
  render() {
    const privateNavItems = (
      <div>
        <Link to='/app' style={style.link}><MenuItem><div>Home</div></MenuItem></Link>
        <Link to='/app/search' style={style.link}><MenuItem><div>Search</div></MenuItem></Link>
        <Link to='/login' style={style.link}><MenuItem><div onClick={this.props.logoutUser}>Logout</div></MenuItem></Link>
      </div>
    );
    const publicNavItems = (
      <Link to='/app/search' style={style.link}><MenuItem><div>Search</div></MenuItem></Link>
    );
    const NavItems = this.props.user.loggedIn ? privateNavItems : publicNavItems;

    /* * Need to question where this._toggleNav coming from. * */
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
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