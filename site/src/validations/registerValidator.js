const {check, body} = require('express-validator');

module.exports = [
    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres')
    
]
