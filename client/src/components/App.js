import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Header from './Header'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import CreatePlan from './plan/CreatePlan'
import Homepage from './Homepage'
import PlanEditor from './plan/PlanEditor'

const App = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='plan' element={<CreatePlan />} />
          <Route path='plan/:planID' element={<PlanEditor />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

