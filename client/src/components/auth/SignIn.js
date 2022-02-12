import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {signIn as requestSignIn} from '../../api/auth'


const SignIn = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMSG, setErrorMSG] = useState('');
  
  const nav = useNavigate();

  const onSignUp = async (evnt) => {
    evnt.preventDefault();
    let err = await requestSignIn({username, password});

    if (err) {
      setErrorMSG(err);
    } else {
      nav('/', {replace: true});
    }
  };

  return (
    <div>
      <section>
        <h2>SignUp</h2>
        <form onSubmit={(evnt) => onSignUp(evnt)}>
          <label>Username</label>
          <input 
            type='text'
            value={username}
            onChange={evnt => setUsername(evnt.target.value)} 
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

export default SignIn;