const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const { clientNotFound, clientDeleted } = require("../helpers/constants.js");

// EP to get all clients
const getClients = async (req, res) => {
  try {
    const getAllClients = await models.clients.findAll({
      where: {
        statusDelete: false,
      },
    });

    return res.status(200).send(getAllClients);
  } catch (error) {
    httpError(res, error);
  }
};

// EP to get client by id
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const getClient = await models.clients.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!getClient) return res.status(404).send(response(clientNotFound));

    return res.status(200).send(getClient);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to add client
const addClient = async (req, res) => {
  try {
    const { body } = req;

    const client = await models.clients.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
    });

    return res.status(200).send(client);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const client = await models.clients.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!client) return res.status(404).send(response(clientNotFound));

    client.update({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
    });

    return res.status(200).send(client);
  } catch (error) {
    httpError(res, error);
  }
};

//EP to "delete" client in this case is soft delete, change the value statusDelete true
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await models.clients.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!client) return res.status(404).send(response(clientNotFound));

    client.update({
      statusDelete: true,
    });

    return res.status(200).send(response(clientDeleted));
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
};
