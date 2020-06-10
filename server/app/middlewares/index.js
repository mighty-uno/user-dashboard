require("../services/auth/passport"); //passportService for auth strategy

module.exports = {
  requireUserAuth: require("./requireUserAuth"),
  requireSignin: require("./requireSignin"),
};
