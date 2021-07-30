var express = require('express');
var router = express.Router();

const {verMas, detail, administrador, carrito, pago, agregarProducto, editarProducto} = require("../controllers/productController")


router.get('/', verMas);
router.get("/detalle", detail);
router.get("/administrador", administrador);
router.get("/agregar", agregarProducto);
router.get("/editar", editarProducto);
router.get("/carrito", carrito);
router.get("/pago", pago);

module.exports = router;