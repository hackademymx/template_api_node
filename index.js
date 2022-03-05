const { PORT } = require("./config/config");
const { db } = require("./config/database");
const { router } = require("./server/routes");

const express = require("express");

const server = express();

server.use(express.json());
server.use("/api/v1", router);

db.sync().then(async () => {
  server.listen(PORT, () => console.log(`server is running at ${PORT} `));
});
