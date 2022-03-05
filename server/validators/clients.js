const { check } = require("express-validator");
const {
  clientNameRequired,
  clientEmailRequired,
} = require("../helpers/constants");
const { validateResult } = require("../helpers/validators");

const validCreateUpClient = [
  check("name").not().isEmpty().withMessage(clientNameRequired),
  check("email").not().isEmpty().withMessage(clientEmailRequired),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validCreateUpClient };
