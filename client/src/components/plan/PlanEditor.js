import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {getPlanDetails} from '../../api/plan'


const PlanEditor = () => {
  
  const [numDays, setNumDays] = useState(0);
  const [current, setCurrent] = useState(-1);

  const location = useLocation();

  useEffect(() => {

    const fetchPlan = async () => {
      const planId = location.pathname.split("/")[2];
      const planDetails = await getPlanDetails({planId});
      setNumDays(planDetails.num_days);
      console.log(planDetails.num_days);
    };
    fetchPlan();
  }, []);

  const doStuff = (dayNum) => {
    console.log(dayNum);
    setCurrent(dayNum);
  }

  const constructDays = () => {
    
    let days = [];

    for (let i = 0; i < numDays; i++) {
      days.push(
        <div 
          className='plan-day-tile'
          onClick={() => doStuff(i)}
          key={i}
        >
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