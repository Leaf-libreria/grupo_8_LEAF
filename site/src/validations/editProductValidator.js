const { body, check } = require('express-validator');

module.exports = [
  body('title').notEmpty().withMessage('Campo obligatorio'),
  body('isbn')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números')
    .isISBN()
    .withMessage('ISBN inválido'),
  body('stock')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('formatId').notEmpty().withMessage('Campo obligatorio'),
  body('categorId').notEmpty().withMessage('Campo obligatorio'),
  body('authorId').notEmpty().withMessage('Campo obligatorio'),
  body('editorialId').notEmpty().withMessage('Campo obligatorio'),
  body('genreId').notEmpty().withMessage('Campo obligatorio'),
  body('price')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('pages')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isInt()
    .withMessage('Ingrese solo números'),
  body('starId')
    .isInt({ min: 1, max: 5 })
    .withMessage('Número entre 1 y 5')
    .notEmpty()
    .withMessage('Campo obligatorio'),
  body('slogan')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isLength({ min: 1 })
    .withMessage('Campo obligatorio.'),
  check('synopsis')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isLength({ min: 1})
    .withMessage('Campo obligatorio'),
];

