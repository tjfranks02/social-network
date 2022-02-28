const planManager = require("../controllers/plan")

module.exports = (app) => {
  app.post("/plan/create", (req, res, next) => {
    planManager.createPlan(req, res, next);
  });

  app.get("/plan/details/:planId", (req, res, next) => {
    planManager.getPlanDetails(req, res, next);
  });

};