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
  body("password")
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage("La contraseña debe tener entre 6 y 12 caracteres"),
  body("confirmarContrasenia")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden"),
  check("politicas")
    .isString("off")
    .withMessage("Debes aceptar los términos y condiciones"),
];
