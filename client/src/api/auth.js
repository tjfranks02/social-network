import axios from 'axios'

import config from './config'

const apiBaseUrl = config.apiBaseUrl;

/*
send a signUp request to backend server.

parameters:
  user ({}): object containing user info e.g. username, password, email.
  after (function): callback after receiving response from API.

returns (string):
  error message return from process (if unsuccessful). undefined if succesful.
*/
export function signUp(user) {
  return axios.post(apiBaseUrl + '/signup', user).then((res) => {
    let token = res.data.token;
    localStorage.setItem('token', token);
    return {};
  }).catch((err) => {
    return {
      errorMSG: err.response.data.errorMSG
    };
  });

};

/*
send a signIn request to backend server.

parameters:
  user ({}): object containing user info e.g. username, password.
  after (function): callback after receiving response from API.

returns (string):
  error message return from process (if unsuccessful). undefined if succesful.
*/
export function signIn(user) {

  return axios.post(apiBaseUrl + '/signin', user).then((res) => {
    let token = res.data.token;
    localStorage.setItem('token', token);
  }).catch((err) => {
    return err.response.data.errorMSG;
  });
};