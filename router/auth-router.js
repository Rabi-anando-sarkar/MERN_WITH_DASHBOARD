const express = require("express");

const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware");
const {signUpSchema,logInSchema} = require("../validator/auth-validator");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signUpSchema), authControllers.register);
router
  .route("/login")
  .post(validate(logInSchema), authControllers.login);

module.exports = router;
