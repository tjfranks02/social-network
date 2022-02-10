import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

/*
send a signUp request to backend server.

parameters:
  user ({}): object containing user info e.g. username, password, email.
  after (function): callback after receiving response from API.

returns (string):
  error message return from process (if unsuccessful). undefined if succesful.
*/
export function signUp(user, after) {

  return axios.post(BASE_URL + '/signup', user).then((res) => {
    let token = res.data.token;
    localStorage.setItem('token', token);
  }).catch((err) => {
    return err.response.data.errorMSG;
  });

}
