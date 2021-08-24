const { body, check } = require('express-validator');
const { usuarios } = require('../data/users.json');

module.exports = [
  body('email')
    .notEmpty()
    .withMessage('El e-mail es obligatorio')
    .bail()
    .isEmail()
    .withMessage('Debe ingresar un e-mail válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .bail()
    .isLength({
    min: 6,
    max: 12,
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
];

