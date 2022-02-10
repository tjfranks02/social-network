import React, {useState} from 'react'
import SignUp from './auth/SignUp'

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  
  return (
    <div>
      <h1>React Modal</h1>
      <SignUp show={show} handleClose={hideModal}>
        <p>Modal</p>
      </SignUp>
      <button type="button" onClick={showModal}>
        Open
      </button>
    </div>
  );

};

export default Dashboard;