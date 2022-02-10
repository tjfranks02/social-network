import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export async function signUp(user, after) {

  let res = {};

  try {
    res = await axios.post(BASEURL + '/signup', user);
    localStorage.setItem('token', res.data.token);
    after();
  } catch(err) {
    console.log(err);
    return undefined;
  }

}
