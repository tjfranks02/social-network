import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Header from './Header'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import CreatePlan from './plan/CreatePlan'
import Homepage from './Homepage'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/plan' element={<CreatePlan />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;

