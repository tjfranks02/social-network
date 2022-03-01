import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import CategorySelector from './CategorySelector'
import {createPlan as requestCreatePlan} from '../../api/plan' 

//until the backend route is completed, use a hardcoded list of catgories
let categories = ['Running', 'Reading'];

const CreatePlan = () => {

  const [planName, setPlanName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [numDays, setNumDays] = useState('');
  const [errorMSG, setErrorMSG] = useState('');

  const nav = useNavigate();

  const onCreatePlan = async (evnt) => {
    evnt.preventDefault(); 
    
    //all three fields must be present
    if (!planName || !category || !numDays) {
      setErrorMSG('Please enter username, password and email.');
      return;
    }

    let res = await requestCreatePlan({planName, category, numDays});
    
    if (res.errorMSG) {
      setErrorMSG(res.errorMSG);
    } else {
      nav('/plan/' + res.planId);
    }

  };

  return (
    <div className='form-box'>
      <span className='centered-form-header'>Create Plan</span>
      <form 
        onSubmit={(evnt) => onCreatePlan(evnt)}
        className='general-form'
      >
        <div className='input-box'>
          <label className='field-label'>Name</label>
          <input 
            type='text'
            onChange={(evnt) => setPlanName(evnt.target.value)}
            className='form-input'
          />
        </div>
        <div className='input-box'> 
          <label className='field-label' htmlFor='catselector'>Category</label>
          <CategorySelector 
            onSelect={(cat) => setCategory(cat)} 
            categories={categories}
            name='catselector'
          />
        </div>
        <div className='input-box'>
          <label className='field-label'>How many days?</label>
          <input
            type='number' 
            onChange={(evnt) => setNumDays(evnt.target.value)}
            min='1'
            className='form-input'
            value={numDays}  
          />
        </div>
        <span className='form-error'>{errorMSG}</span>
        <button className='action-button'>Create Plan</button>
      </form>
    </div>
  );
};

export default CreatePlan;