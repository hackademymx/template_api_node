const { check } = require("express-validator");
const { emailRequired, passwordRequired } = require("../helpers/constants");
const { validateResult } = require("../helpers/validators");

const validSignUp = [
  check("email").not().isEmpty().withMessage(emailRequired),
  check("password").not().isEmpty().withMessage(passwordRequired),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validSignUp };
