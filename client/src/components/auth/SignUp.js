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
    <div className='signup-box'>
      <span className='create-account-span'>Sign Up</span>
      <form 
        onSubmit={(evnt) => onSignUp(evnt)}
        className='signup-form'
      >
        <div className='input-box'>
          <label className='field-label' htmlFor='username'>Username</label>
          <input 
            type='text'
            value={username}
            name='username'
            className='signup-input'
            onChange={evnt => setUsername(evnt.target.value)} 
          />
        </div>
        <div className='input-box'>
          <label className='field-label' htmlFor='email'>Email</label>
          <input 
            type='email'
            value={email}
            name='email'
            className='signup-input'
            onChange={evnt => setEmail(evnt.target.value)} 
          />
        </div>
        <div className='input-box'>
          <label className='field-label' htmlFor='password'>Password</label>
          <input 
            type='password'
            value={password}
            name='password'
            className='signup-input'
            onChange={evnt => setPassword(evnt.target.value)}
          />
        </div>
        <button className='signup-button'>Create Account</button>
        {errorMSG}
      </form>
    </div>
  );
};

export default SignUp;
