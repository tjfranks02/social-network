const crypto = require("crypto")

const connection = require("../connect")
const strUtil = require("../util/stringUtil")
const tokUtil = require("../util/tokenUtil")

exports.createPlan = (req, res, next) => {
  let planName = req.body.planName;
  let numDays = req.body.numDays;
  let category = req.body.category;
  let plan_id = crypto.randomBytes(16).toString("hex");
  let token = req.body.token;

  let username = tokUtil.decryptToken(token).sub;

  if (!planName || !numDays || !category) {
    return res.status(422).send({
      errorMSG: "Plan must have name, number of days and category."
    });
  }

  // const sql = strUtil.format("INSERT INTO plans "
  // + "VALUES({0}, {1}, {2}, {3}, {4});", plan_id,);

  // connection("INSERT INTO plans "
  //   + "VALUES({0}, {1}, {2}, {3}, {4});"
  // );

};