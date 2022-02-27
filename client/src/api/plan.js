import axios from 'axios'

import config from './config'

const apiBaseUrl = config.apiBaseUrl;

export function createPlan({planName, category, numDays}) {
  let token = localStorage.getItem("token");

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
