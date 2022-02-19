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
    
    //all three fields must be present
    if (!username || !password) {
      setErrorMSG('Please enter all of username, password and email.');
      return;
    }

    let err = await requestSignIn({username, password});

    if (err) {
      setErrorMSG(err);
    } else {
      nav('/', {replace: true});
    }
  };

  return (
    <div className='auth-box'>
      <span className='centered-form-header'>Sign In</span>
      <form 
        onSubmit={(evnt) => onSignUp(evnt)}
        className='auth-form'
      >
        <div className='input-box'>
          <label className='field-label' htmlFor='username'>Username</label>
          <input 
            type='text'
            value={username}
            name='username'
            className='form-input'
            onChange={evnt => setUsername(evnt.target.value)} 
          />
        </div>
        <div className='input-box'>
          <label className='field-label' htmlFor='password'>Password</label>
          <input 
            type='password'
            name='password'
            value={password}
            className='form-input'
            onChange={evnt => setPassword(evnt.target.value)}
          />
        </div>
        <span className='form-error'>{errorMSG}</span>
        <button className='action-button'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;