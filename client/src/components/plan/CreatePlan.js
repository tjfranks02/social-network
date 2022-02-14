import React from 'react'

import CategorySelector from './CategorySelector'

const CreatePlan = () => {

  const onCreatePlan = (evnt) => {
    evnt.preventDefault();
    return undefined;
  };

  return (
    <div>
      <section>
        <h2>Create Plan</h2>
        <form onSubmit={(evnt) => onCreatePlan(evnt)}>
          <h4>Name</h4>
          <input 
            type='text'
          />
          <div className='category-box'> 
            <h4>Category</h4>
              <CategorySelector />
          </div>
          <h4>How many days?</h4>
          <input type='number' />
        </form>
      </section>
    </div>
  );
};

export default CreatePlan;