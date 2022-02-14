import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {signUp as requestSignUp} from '../../api/auth'


const SignUp = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMSG, setErrorMSG] = useState('');
  
  const nav = useNavigate();

  const onSignUp = async (evnt) => {
    evnt.preventDefault();

    //all three fields must be present
    if (!username || !password || !email) {
      setErrorMSG('Please enter all of username, password and email.');
      return;
    }

    let err = await requestSignUp({username, password, email});
    
    if (err) {
      setErrorMSG(err);
    } else {
      nav('/', {replace: true});
    }
  };

  return (
    <div>
      <section>
        <h2>Sign Up</h2>
        <form onSubmit={(evnt) => onSignUp(evnt)}>
          <label>Username</label>
          <input 
            type='text'
            value={username}
            onChange={evnt => setUsername(evnt.target.value)} 
          />
          <label>Email</label>
          <input 
            type='email'
            value={email}
            onChange={evnt => setEmail(evnt.target.value)} 
          />
          <label>Password</label>
          <input 
            type='password'
            value={password}
            onChange={evnt => setPassword(evnt.target.value)}
          />
          <button>Create Account</button>
          {errorMSG}
        </form>
      </section>
    </div>
  );
};

export default SignUp;
