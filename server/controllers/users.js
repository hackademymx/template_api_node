const models = require("../../database/models");
const { httpError, response } = require("../helpers/responses");
const {
  JWT_SECRET,
  EXPIRESS_ACCESS_TOKEN,
  EXPIRESS_REFRESH_TOKEN,
} = require("../../config/config");

const bcrypt = require("bcryptjs");
const randtoken = require("rand-token");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const { body } = req;

    const findEmail = await models.users.findOne({
      where: { email: body.email },
    });

    if (findEmail)
      return res
        .status(400)
        .send(response("Ya existe una cuenta con ese correo"));

    const passwordHash = await bcrypt.hash(body.password, 10); //Se encripta password con la libreria bcryptjs

    const user = await models.users.create({
      email: body.email,
      password: passwordHash,
    });

    delete user.dataValues.password; //El password no se está eliminando de la BD solo del objeto para que no se muestre en la respuesta

    return res.status(201).send(user);
  } catch (error) {
    return httpError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;

    const user = await models.users.findOne({
      where: { email: body.email },
    });
    if (!user)
      return res
        .status(404)
        .send(response("No se encontró una cuenta con ese correo")); //Se hace la búsqueda con el email en caso de no encontrarlo regresa mensaje de error

    let matchPassword = bcrypt.compareSync(body.password, user.password); //Compara la contraseña guardada en la BD y la que llega en el body, se usa una función de bcrypt que valida que hagan match

    delete user.dataValues.password;

    if (!matchPassword)
      return res.status(404).send(response("Contraseña no coincide"));

    let refreshToken = randtoken.generate(16); //Se genera un string que servirá cono refresh token

    let findSession = await models.sessions.findOne({
      where: { userId: user.id },
    }); //Se busca un registro de session por usuario, si no encuentra deberá crear uno, de lo contrario se actualiza el mismo

    if (!findSession)
      await models.sessions.create({
        refreshToken: refreshToken,
        userId: user.id,
      });
    else await findSession.update({ refreshToken }); //Se actualiza el refresh token en la tabla de sessions

    let accessToken = jwt.sign({ user: user }, JWT_SECRET, {
      expiresIn: EXPIRESS_ACCESS_TOKEN,
    }); //Se genera un token con la libreria jsonwebtoken, se envia como payload la información que queremos se codifique, el secreto que firmará al mismo y la fecha de expiración
    refreshToken = jwt.sign(
      { refreshToken: refreshToken, id: user.id },
      JWT_SECRET,
      {
        expiresIn: EXPIRESS_REFRESH_TOKEN,
      }
    ); //Se genera un refresh token que servirá para obtener nuevo access token cuando este expira en el payload se incluye un código que se generó antes y el cual está guardado en la tabla de sessions

    return res.status(200).send({ user, accessToken, refreshToken });
  } catch (error) {
    return httpError(res, error);
  }
};

const generateAccesToken = async (req, res) => {
  try {
    const { body } = req;
    try {
      let decoded = await jwt.verify(body.refreshToken, JWT_SECRET);

      const user = await models.users.findOne({
        where: { id: decoded.id },
        attributes: ["id", "email"],
        include: {
          model: models.sessions,
          where: { refreshToken: decoded.refreshToken },
        },
      });

      if (user) {
        let refreshToken = randtoken.generate(16);

        await models.sessions.update(
          { refreshToken },
          { where: { userId: decoded.id } }
        );

        let accessToken = jwt.sign(
          { user: { id: user.id, email: user.email } },
          JWT_SECRET,
          { expiresIn: EXPIRESS_ACCESS_TOKEN }
        );
        refreshToken = jwt.sign(
          { refreshToken: refreshToken, id: user.id },
          JWT_SECRET,
          {
            expiresIn: EXPIRESS_REFRESH_TOKEN,
          }
        );

        return res.status(200).send({ accessToken, refreshToken });
      }

      return res
        .status(401)
        .send(response("No es posible generar un access token"));
    } catch (error) {
      return res.status(401).send(response("Token de acceso inválido"));
    }
  } catch (error) {
    return httpError(res, error);
  }
};

module.exports = { addUser, login, generateAccesToken };
