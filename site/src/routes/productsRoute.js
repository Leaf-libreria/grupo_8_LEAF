var express = require('express');
var router = express.Router();

const {verMas, detail, administrador, carrito, pago, agregarProducto, editarProducto, libros, ebooks, policial, romance, terror, misterio, historica, ficcion, cienciaFiccion, novela, juvenil} = require("../controllers/productController")

// /products
router.get('/ebooks', ebooks);
router.get('/libros', libros);
router.get('/', verMas);
router.get("/detalle", detail);
router.get("/administrador", administrador);
router.get("/agregar", agregarProducto);
router.get("/editar", editarProducto);
router.get("/carrito", carrito);
router.get("/pago", pago);
// rutas de generos
router.get('/misterio', misterio);
router.get('/terror', terror);
router.get('/romance', romance);
router.get('/historica', historica);
router.get('/ficcion', ficcion);
router.get('/ciencia-ficcion', cienciaFiccion);
router.get('/policial', policial);
router.get('/novela', novela);
router.get('/juvenil', juvenil)
module.exports = router;