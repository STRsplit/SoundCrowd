import axios from 'axios';

const setUser = user => {
  return {
    type: 'SET_USER',
    payload: user
  };
};

const setVerifying = boolean => {
  return {
    type: 'SET_VERIFYING',
    payload: boolean
  };
};

const verifyUser = () => {
  return {
    type: 'VERIFY_USER',
    payload: new Promise((resolve, reject) => {
      axios.get('/api/verify_user')
      .then(result => {
        const { id, login, name } = result.data;
        if (login) {
          resolve({
            loggedIn: true,
            name: name,
            id: id
          });
        } else {
          resolve({
            loggedIn: false,
            name: '',
            id: ''
          });
        }
      })
      .catch(err => console.log('userActions.js > VERIFY_USER error: ', err));
      })
  };
};

const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
    payload: new Promise((resolve, reject) => {
      axios.get('/logout')
      .catch(err => {
        console.log('userActions.js > LOGOUT_USER err: ', err);
      });
      resolve({loggedIn: false, name: ''});
    })
  };
};

export {
  setUser,
  verifyUser,
  logoutUser,
  setVerifying,
};