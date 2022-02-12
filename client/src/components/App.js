import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Test from './Test'
import Header from './Header'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;

