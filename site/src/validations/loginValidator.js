const { body, check } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcryptjs");

module.exports = [
  check("email")
  .isEmail()
  .withMessage("Debes ingresar un email válido"),

  body("email").custom((value, { req }) => {
    
    return db.User.findOne({
      where: {
        email: value,
      },
    })
      .then((user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          return Promise.reject();
        }
      })
      .catch(() => Promise.reject("Credenciales inválidas"));
  }),
];
