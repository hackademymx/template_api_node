const { check } = require("express-validator");
const { clientRequired, saucerRequired } = require("../helpers/constants");
const { validateResult } = require("../helpers/validators");

const validCreateOrder = [
  check("clientId").not().isEmpty().withMessage(clientRequired),
  check("saucerId").not().isEmpty().withMessage(saucerRequired),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validCreateOrder };
