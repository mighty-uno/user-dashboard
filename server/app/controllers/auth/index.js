const { JWT_SECRET, JWT_EXPIRY } = require("../../config/keys");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../../models");

function createTokenForUser(user, cb) {
  jsonwebtoken.sign(
    { userId: user._id },
    JWT_SECRET,
    { algorithm: "HS256", expiresIn: JWT_EXPIRY },
    function (err, token) {
      if (err) return cb(err);
      cb(null, token);
    }
  );
}

class AuthController {
  async signin(req, res) {
    createTokenForUser(req.user, function (err, token) {
      if (err) return res.status(500).send({ error: "Server Error" });
      res.cookie("token", token);
      const { email, name } = req.user;
      res.send({ email, name });
    });
  }

  async logout(req, res) {
    res.clearCookie("token");
    res.send(true);
  }

  async signup(req, res) {
    const user = new User(req.body);
    try {
      await user.save();
      delete user._id;
      delete user.password;

      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "server error");
    }
  }
}

module.exports = new AuthController();
