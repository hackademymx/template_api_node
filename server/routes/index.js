const { clients, saucers, orders } = require("../controllers");
const { validCreateUpClient } = require("../validators/clients");
const { validCreateUpSaucer } = require("../validators/saucers");
const { validCreateOrder } = require("../validators/orders");

const { Router } = require("express");

const router = Router();

router
  .route("/clients")
  .get(clients.getClients)
  .post(validCreateUpClient, clients.addClient);

router
  .route("/clients/:id")
  .get(clients.getClientById)
  .put(clients.updateClient)
  .delete(clients.deleteClient);

router
  .route("/saucers")
  .get(saucers.getSaucers)
  .post(validCreateUpSaucer, saucers.addSaucer);

router
  .route("/saucers/:id")
  .get(saucers.getSaucerById)
  .put(validCreateUpSaucer, saucers.updateSaucer)
  .delete(saucers.deleteSaucer);

router
  .route("/orders")
  .get(orders.getOrders)
  .post(validCreateOrder, orders.addOrder);

router.route("/orders/:id").get(orders.getOrderById).delete(orders.deleteOrder);

module.exports = { router };
