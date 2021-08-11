var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    },
})



const {
  verMas,
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
  ficcion,
  cienciaFiccion,
  novela,
  juvenil,
  actualizarProducto,
  addProducto,
  borrar,
} = require("../controllers/productController");

// /products
router.get('/ebooks', ebooks);
router.get('/libros', libros);
router.get('/', verMas);
router.get("/detalle/:id", detail);
router.get("/administrador", administrador);
// Carga de productos
router.get("/agregar", addProducto);
router.post("/agregar", agregarProducto);
 router.get("/editar/:id", editarProducto);
router.put("/editar/:id", actualizarProducto);
router.delete("/delete/:id", borrar);
router.get("/carrito", carrito);
router.get("/pago", pago);
// rutas de generos
router.get("/misterio", misterio);
router.get("/terror", terror);
router.get("/romance", romance);
router.get("/historica", historica);
router.get("/ficcion", ficcion);
router.get("/ciencia-ficcion", cienciaFiccion);
router.get("/policial", policial);
router.get("/novela", novela);
router.get("/juvenil", juvenil);


module.exports = router;