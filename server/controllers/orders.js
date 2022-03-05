const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const {
  orderNotFound,
  orderDeleted,
  saucerNotFound,
  clientNotFound,
} = require("../helpers/constants.js");

const getOrders = async (req, res) => {
  try {
    const getAllOrders = await models.orders.findAll({
      where: {
        statusDelete: false,
      },
      include: [{ model: models.clients }, { model: models.saucers }],
    });

    return res.status(200).send(getAllOrders);
  } catch (error) {
    httpError(res, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const getOrder = await models.orders.findOne({
      where: {
        id,
        statusDelete: false,
      },
      include: [{ model: models.clients }, { model: models.saucers }],
    });

    if (!getOrder) return res.status(404).send(response(orderNotFound));

    return res.status(200).send(getOrder);
  } catch (error) {
    httpError(res, error);
  }
};

const addOrder = async (req, res) => {
  try {
    const { body } = req;

    const saucer = await models.saucers.findOne({
      where: {
        id: body.saucerId,
        statusDelete: false,
      },
    });

    if (!saucer) return res.status(400).send(response(saucerNotFound));

    const client = await models.clients.findOne({
      where: {
        id: body.clientId,
        statusDelete: false,
      },
    });

    if (!saucer) return res.status(400).send(response(clientNotFound));

    const amount = body.quantity * saucer.price;

    const order = await models.orders.create({
      clientId: client.id,
      saucerId: saucer.id,
      date: new Date(),
      quantity: body.quantity,
      amount,
    });

    return res.status(200).send(order);
  } catch (error) {
    httpError(res, error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await models.orders.findOne({
      where: {
        id,
        statusDelete: false,
      },
    });

    if (!order) return res.status(404).send(response(orderNotFound));

    order.update({
      statusDelete: true,
    });

    return res.status(200).send(response(orderDeleted));
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
};
