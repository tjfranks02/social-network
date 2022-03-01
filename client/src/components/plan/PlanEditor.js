import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {getPlanDetails} from '../../api/plan'


const PlanEditor = () => {
  
  const [numDays, setNumDays] = useState(1);

  const location = useLocation();
  console.log(location);

  useEffect(() => {

    const fetchPlan = async () => {
      const planDetails = await getPlanDetails();
      setNumDays(planDetails.numDays);
    };
    fetchPlan();
  }, []);

  const constructDays = () => {
    
    let days = [];

    for (let i = 0; i <= numDays; i++) {
      days.push(
        <div>
          {i}
        </div>
      );
    }
    return days;
  };

  
  return (
    <div className='plan-editor-container'>
      <div className='grid-3'>
        {constructDays()}
      </div>
    </div>
  );
};

export default PlanEditor;