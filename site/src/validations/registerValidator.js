   
const {check, body} = require('express-validator');

module.exports = [
<<<<<<< HEAD
    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
=======
<<<<<<< HEAD
  check('email').isEmail().withMessage('Debes ingresar un email válido'),

  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage('El nombre tiene que tener como mínimo 2 caracteres'),
  body('password')
<<<<<<< HEAD
=======
=======
    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
>>>>>>> fc81390475bfe79f1691a5881181a342425a67da
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
  body('confirmarContrasenia')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage('Las contraseñas no coinciden'),
  check('politicas')
    .isString('off')
    .withMessage('Debes aceptar los términos y condiciones'),
];