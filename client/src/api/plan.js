import axios from 'axios'

import config from './config'
const apiBaseUrl = config.apiBaseUrl;

const token = localStorage.getItem("token");

export function createPlan({planName, category, numDays}) {

  return axios.post(apiBaseUrl + '/plan/create', 
    {
      planName: planName,
      category: category,
      numDays: numDays
    },
    {
      headers: {'Authorization': token}
    })
    .then((res) => {
      return {planId: res.data.planId};
    }).catch((err) => {
      return {errorMSG: err.response.data.errorMSG};
    });
};


export function getPlanDetails({planId}) {

  return axios.get(apiBaseUrl + '/plan/details/' + planId,
    {
      headers: {'Authorization': token}
    }
  )
  .then((res) => {
    return res;
  })
  .catch((err) => {
    return {errorMSG: err.response.data.errorMSG};
  });

};