import React, {useState} from 'react'
import '../modal.css'

import {signUp as requestSignUp} from '../../api/auth'


const SignUp = ({handleClose, show}) => {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [errorMSG, setErrorMSG] = useState('');

  const showHideClassName =
    show ? 'modal display-block' : 'modal display-none';
  
  const onSignUp = async (evnt) => {
    evnt.preventDefault();
    let err = await requestSignUp({username, password, email});
    console.log("The error:", err);
    
    if (err) {
      setErrorMSG(err);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <h2>SignUp</h2>
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
        <button onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default SignUp;
