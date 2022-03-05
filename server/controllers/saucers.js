const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { saucerNotFound, saucerDeleted } = require("../helpers/constants.js");

//EP to get all soucers
const getSaucers = async (req, res) => {
  try {
    const getAllSaucers = await models.saucers.findAll({
      where: {
        statusDelete: false,
      },
    });

    return res.status(200).send(getAllSaucers);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to get saucer by id
const getSaucerById = async (req, res) => {
  try {
    const { id } = req.params;

    const getSaucer = await models.saucers.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!getSaucer) return res.status(404).send(response(saucerNotFound));

    return res.status(200).send(getSaucer);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to add saucer
const addSaucer = async (req, res) => {
  try {
    const { body } = req;

    const saucer = await models.saucers.create({
      name: body.name,
      description: body.description,
      price: body.price,
    });

    return res.status(200).send(saucer);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to update saucer
const updateSaucer = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const saucer = await models.saucers.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!saucer) return res.status(404).send(response(saucerNotFound));

    saucer.update({
      name: body.name,
      description: body.description,
      price: body.price,
    });

    return res.status(200).send(saucer);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to delete saucer
const deleteSaucer = async (req, res) => {
  try {
    const { id } = req.params;

    const saucer = await models.saucers.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!saucer) return res.status(404).send(response(saucerNotFound));

    saucer.update({
      statusDelete: true,
    });

    return res.status(200).send(response(saucerDeleted));
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  getSaucers,
  getSaucerById,
  addSaucer,
  updateSaucer,
  deleteSaucer,
};
