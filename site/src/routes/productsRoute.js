var express = require('express');
var router = express.Router();

const {verMas, detail, administrador, carrito, pago} = require("../controllers/productController")


router.get('/', verMas);
router.get("/detalle", detail);
router.get("/administrador", administrador);
router.get("/carrito", carrito);
router.get("/pago", pago);

module.exports = router;