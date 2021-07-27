var express = require('express');
var router = express.Router();

const {index, preguntas, quienesSomos} = require("../controllers/indexController")

/* GET home page. */
router.get('/', index);
router.get("/preguntasFrecuentes", preguntas);
router.get("/quienesSomos", quienesSomos)

module.exports = router;
