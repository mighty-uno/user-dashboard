const { requireUserAuth } = require("../middlewares");
const authRoutes = require("./auth");
const apiRoutes = require("./api");

module.exports = function (app) {
  app.use("/api", requireUserAuth, apiRoutes); //only authorizated user have access
  app.use("/auth", authRoutes); //login, signup ,  etcconst
};
