const {check, body} = require('express-validator');

module.exports = [
    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),
]