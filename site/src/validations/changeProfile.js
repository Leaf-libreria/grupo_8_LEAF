const { check, body } = require("express-validator");

module.exports = [
  check("email").isEmail().withMessage("Debes ingresar un email válido"),

  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("El nombre tiene que tener como mínimo 2 caracteres"),
];
