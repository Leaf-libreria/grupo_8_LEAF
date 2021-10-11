const path = require("path");
const { check, body } = require("express-validator");
const db = require('../database/models')
let regexPassword = /^(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
module.exports = [
  // campo de email
  check("email").isEmail().withMessage("Debes ingresar un email válido"),
  body('email')
    .custom(value => {
      console.log(value)
      return db.User.findOne(
        {
          where:
            { email: value }
        }).then(user => {
          if (user) {
            return Promise.reject('El email ya está registrado')
          }
        })
    }),
  // campo de nombre
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("El nombre debe que tener como mínimo 2 caracteres"),
  body("lastname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("El apellido debe que tener como mínimo 2 caracteres"),
  //campo de imagen de perfil
  body("image").custom((value, { req }) => {
    let image = req.file;
    let allowedExtensions = [".jpg",".jpeg", ".png", ".gif"];
    console.log(image);
    if (image) {

      let fileExtension = path.extname(image.originalname);

      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${allowedExtensions.join(", ")}`
        );
      }
    }
    return true;
  }),
  // campo de contraseña
  body("password")
    .notEmpty()
    .withMessage("Debes ingresar una contraseña"),
  body('password')
    .custom(value => {
      console.log(value);
      if (!regexPassword.test(value)) {
        throw new Error("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, al menos una minúscula y al menos un carácter especial (#?!@$%^&*-)");
      } else {
        return true
      }

    })
  ,
  // campo de confirmar contraseña
  body("confirmarContrasenia")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden"),
  // campo de politica de privacidad
  check("politicas")
    .isString("off")
    .withMessage("Debes aceptar los términos y condiciones"),
];




