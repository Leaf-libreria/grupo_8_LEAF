var express = require('express');
var router = express.Router();

const {verMas, detail, administrador, carrito, pago, agregarProducto, editarProducto, libros} = require("../controllers/productController")

router.get('/libros', libros);
router.get('/', verMas);
router.get("/detalle/:id", detail);
router.get("/administrador", administrador);
router.get("/agregar", agregarProducto);
router.get("/editar", editarProducto);
router.get("/carrito", carrito);
router.get("/pago", pago);

module.exports = router;