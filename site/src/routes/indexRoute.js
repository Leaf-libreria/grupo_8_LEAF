var express = require('express');
var router = express.Router();

const {index, preguntas, quienesSomos, search} = require("../controllers/indexController");
const { generos } = require('../controllers/productController');


/* GET home page. */
router.get('/', index);
router.get("/preguntasFrecuentes", preguntas);
router.get("/quienesSomos", quienesSomos)
// resultado de busqueda
router.get('/search', search);
module.exports = router;
