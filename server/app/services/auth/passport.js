const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const { User } = require("../../models");
const { JWT_SECRET } = require("../../config/keys");

const fromCookie = (req) => {
  return req.cookies.token || "";
};
const jwtOptions = {
  jwtFromRequest: fromCookie,
  secretOrKey: JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
  //if userId in payload exists in Database
  //if yes call done with user object
  //else call done empty
  try {
    const user = await User.findOne({
      _id: payload.userId,
      organization: payload.organizationId,
      isActive: true,
    });
    if (user) {
      delete user.password;
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
}); //payload is decoded json token

const localoptions = {
  usernameField: "email",
};

//for email & password signin
const localLogin = new LocalStrategy(localoptions, async function (
  email,
  password,
  done
) {
  //find the user with this email and compare password
  //if yes call done with user object
  //else call done empty

  try {
    const user = await User.findOne({
      email,
      isActive: true,
    });
    if (!user) return done(null, false);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false);
    delete user.password;
    return done(null, user);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});
passport.use(localLogin);
passport.use(jwtLogin);
