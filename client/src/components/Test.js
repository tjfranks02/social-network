import React from 'react'
import {useNavigate} from 'react-router-dom'

const Test = (props) => {
  
  const nav = useNavigate();
  
  const handleClick = () => {
    nav('/route', {replace: true});
  };

  return (
    <div>
      <div>This is the test one</div>
      <button onClick={() => handleClick()}>Press please</button>
    </div>
  );
}

export default Test;