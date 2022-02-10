import React, {useState} from 'react'
import '../modal.css'


const onSignUp = (evnt) => {
  evnt.preventDefault();
  console.log("SignUp clicked!");
};

const SignUp = ({handleClose, show}) => {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const showHideClassName =
    show ? 'modal display-block' : 'modal display-none';
  
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
          <label>Password</label>
          <input 
            type='password'
            value={password}
            onChange={evnt => setPassword(evnt.target.value)}
          />
          <button>Create Account</button>
        </form>
        <button onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default SignUp;
