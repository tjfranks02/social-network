import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header className='header'>
        <nav>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/signin'>Sign In</Link>
        </nav>
      </header>
    </div>
  );  
};

export default Header;