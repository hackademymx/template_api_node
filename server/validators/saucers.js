const { check } = require("express-validator");
const {
  saucerNameRequired,
  saucerPriceRequired,
} = require("../helpers/constants");
const { validateResult } = require("../helpers/validators");

const validCreateUpSaucer = [
  check("name").not().isEmpty().withMessage(saucerNameRequired),
  check("price").not().isEmpty().withMessage(saucerPriceRequired),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validCreateUpSaucer };
