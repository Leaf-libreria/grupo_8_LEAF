var express = require('express');
var router = express.Router();
const path = require('path');
//Validaciones para CRUD productos
const addValidator = require('../validations/addProductValidator');
const editValidator = require('../validations/editProductValidator');
//middleware acceso administrador
const administradorMw= require('../middlewares/adminUserCheck')
//middleware acceso usuarios logueados
const logueados=require('../middlewares/loggedUser')

//Multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//Controlador
const {
  verMasVendidos,
  detail,
  administrador,
  carrito,
  pago,
  agregarProducto,
  editarProducto,
  libros,
  ebooks,
  policial,
  romance,
  terror,
  misterio,
  historica,
  cienciaFiccion,
  juvenil,
  actualizarProducto,
  addProducto,
  borrar,
  verMasNovedades,
  verMasRecomendados,

} = require('../controllers/productController');

// /products
router.get('/ebooks', ebooks);
router.get('/libros', libros);
router.get('/masVendidos', verMasVendidos);
router.get('/masNovedades', verMasNovedades);
router.get('/masRecomendados', verMasRecomendados);
router.get('/detalle/:id', detail);
router.get('/administrador', administradorMw, administrador);
// Carga de productos CRUD
router.get('/agregar', administradorMw, addProducto);
router.post(
  '/agregar',
  upload.single('cover'),
  addValidator,
  agregarProducto
);
router.get('/editar/:id',administradorMw, editarProducto);
router.put('/editar/:id', upload.single('cover'),editValidator, actualizarProducto);
router.delete('/delete/:id', borrar);
//Carrito y formulario de pago
router.get('/carrito',logueados, carrito);
router.get('/pago',logueados, pago);
// rutas de generos
router.get('/misterio', misterio);
router.get('/terror', terror);
router.get('/romance', romance);
router.get('/historica', historica);
router.get('/ciencia-ficcion', cienciaFiccion);
router.get('/policial', policial);
router.get('/juvenil', juvenil);

module.exports = router;
