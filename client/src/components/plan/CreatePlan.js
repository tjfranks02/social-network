import React, {useState} from 'react'

import CategorySelector from './CategorySelector'

//until the backend route is completed, use a hardcoded list of catgories
let categories = ['Running', 'Reading'];

const CreatePlan = () => {

  const [planName, setPlanName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [numDays, setNumDays] = useState('');

  const onCreatePlan = (evnt) => {
    evnt.preventDefault(); 
    console.log('Plan name:', planName);
    console.log('Category:', category);
    console.log('Number of days:', numDays);
  };

  return (
    <div>
      <h2>Create Plan</h2>
      <form onSubmit={(evnt) => onCreatePlan(evnt)}>
        <h4>Name</h4>
        <input 
          type='text'
          onChange={(evnt) => setPlanName(evnt.target.value)}
        />
        <div className='category-box'> 
          <h4>Category</h4>
            <CategorySelector 
              onSelect={(cat) => setCategory(cat)} 
              categories={categories}
            />
        </div>
        <h4>How many days?</h4>
        <input
          type='number' 
          onChange={(evnt) => setNumDays(evnt.target.value)}
          min='1'
          value={numDays}  
        />
        <br />
        <button>Create Plan</button>
      </form>
    </div>
  );
};

export default CreatePlan;