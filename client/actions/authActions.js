import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
     localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function activateUser(activatetoken) {
  return dispatch => {
    return axios.post('/api/activateUser',activatetoken).then(res => {
      return Promise.resolve();
    });
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      const roleuser = res.data.role;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('role',roleuser)
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      console.log("From Auth Actions");
      console.log(res.data);
       return Promise.resolve(res.data);
    });
  }
}