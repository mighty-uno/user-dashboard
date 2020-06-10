const passport = require("passport");
const requireSignin = passport.authenticate("local", { session: false }); //middleware to signin

module.exports = requireSignin;
