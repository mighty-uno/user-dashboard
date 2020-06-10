const { body } = require("express-validator");
const router = require("express").Router();
const { requireSignin } = require("../../middlewares");
const expressValidateError = require("../../helpers/expressValidateError");
const AuthController = require("../../controllers/auth");

router.post(
  "/login",
  expressValidateError([
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .bail()
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8, max: 40 })
      .withMessage("must be at least 8 chars long & at max 40"),
  ]),
  requireSignin,
  AuthController.signin
);

router.post(
  "/signup",
  expressValidateError([
    body("name").not().isEmpty().bail().trim(),
    body("password")
      .isLength({ min: 8, max: 40 })
      .withMessage("Invalid password length 8-40"),

    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .bail()
      .normalizeEmail(),
  ]),
  AuthController.signup
);

router.post("/logout", AuthController.logout);

module.exports = router;
