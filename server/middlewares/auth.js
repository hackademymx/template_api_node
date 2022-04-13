const { JWT_SECRET } = require("../../config/config");

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.get("Authorization");
    console.log(token);
    token = token.split(" ");
    console.log(token[1]);
    const decoded = jwt.verify(token[1], JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).send("Token de acceso inválido");
  }
};

module.exports = { verifyToken };
