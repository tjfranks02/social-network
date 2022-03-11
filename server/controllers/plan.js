const crypto = require("crypto")

const connection = require("../connect")
const strUtil = require("../util/stringUtil")
const tokUtil = require("../util/tokenUtil")

exports.createPlan = (req, res, next) => {
  let planName = req.body.planName;
  let numDays = req.body.numDays;
  let category = req.body.category;
  let plan_id = crypto.randomBytes(16).toString("hex");
  const token = req.headers.authorization

  let username = tokUtil.decryptToken(token).sub;

  if (!planName || !numDays || !category) {
    return res.status(422).send({
      errorMSG: "Plan must have name, number of days and category."
    });
  }

  const sql = strUtil.format("INSERT INTO plans "
    + "VALUES('{0}', '{1}', {2}, '{3}', '{4}');", 
    username, plan_id, numDays, category, planName
  );

  connection(sql).then(() => {
    return res.json({
      planId: plan_id
    });
  }).catch(() => {
    return res.status(500).send({
      errorMSG: "Failed to create plan."
    });
  });

};


exports.getPlanDetails = (req, res, next) => {
  const planId = req.params.planId;
  const token = req.headers.authorization;
  
  const userId = tokUtil.decryptToken(token).sub;

  if (!planId) {
    return res.json({
      errorMSG: 'Plan cannot be fetched without ID.'
    });
  }

  const sql = strUtil.format("SELECT * "
    + "FROM plans "
    + "WHERE plan_id='{0}' AND user_id='{1}';", planId, userId
  ); 

  connection(sql).then((planDetails) => {
    
    return new Promise((resolve, reject) => {

      if (planDetails.length === 0 || !planDetails) {
        return reject({
          errorMSG: 'There is no plan with that id.' 
        });
        
      }

      //if successful
      res.json({
        planDetails: planDetails[0]
      });
      return resolve();
    });
  }).catch((err) => {
    console.log("ERROR FINALLY?");
    return res.status(422).send(err);
  });
};