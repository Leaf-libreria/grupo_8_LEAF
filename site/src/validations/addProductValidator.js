const { body, check } = require("express-validator");

module.exports = [
  body('titulo')
    .notEmpty()
    .withMessage('Campo obligatorio'),
  body('isbn')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('stock')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('formato').notEmpty().withMessage('Campo obligatorio'),
  body('categoria').notEmpty().withMessage('Campo obligatorio'),
  body('autor').notEmpty().withMessage('Campo obligatorio'),
  body('editorial').notEmpty().withMessage('Campo obligatorio'),
  body('genero').notEmpty().withMessage('Campo obligatorio'),
  body('precio')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('paginas')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('estrellas')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt().withMessage('Ingrese solo números'),
  body('slogan').notEmpty().withMessage('Campo obligatorio'),
body('sinopsis')
        .notEmpty()
        .withMessage('Campo obligatorio')
];