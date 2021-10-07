var express = require("express");
var router = express.Router();
const path = require("path");
//Validaciones para CRUD productos
const addValidator = require("../validations/addProductValidator");
const editValidator = require("../validations/editProductValidator");
const addAuthorValidator= require('../validations/addAuthorValidator');
const addGenreEditorialValidator=require('../validations/addGenreEditorialValidator')
//middleware acceso administrador
const administradorMw = require("../middlewares/adminUserCheck");
//middleware acceso usuarios logueados
const logueados = require("../middlewares/loggedUser");

//Multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
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
  thriller,
  fantasia,
  addImages,
  addAuthorPost,
  addAuthorGet,
  addGenreGet,
  addGenrePost,
  addEditorialGet,
  addEditorialPost,
addCarouselGet,
addCarouselPost,
addPromoGet,
addPromoPost,
editCarouselGet,
editCarouselUpdate,
authorList,
editAuthorPut,
editAuthorGet,
deleteAuthor,
editEditorialPut,
deleteEditorial,
editEditorialGet,
editorialList,
genreList,
editGenreGet,
editGenrePut,
deleteGenre,
} = require("../controllers/productController");

// /products
router.get("/ebooks", ebooks);
router.get("/libros", libros);
router.get("/masVendidos", verMasVendidos);
router.get("/masNovedades", verMasNovedades);
router.get("/masRecomendados", verMasRecomendados);
router.get("/detalle/:id", detail);
router.get("/administrador", administradorMw, administrador);
// Carga de productos CRUD
router.get("/agregar", administradorMw, addProducto);
router.post("/agregar", administradorMw,upload.single("cover"),addValidator,agregarProducto);
router.get("/editar/:id", administradorMw, editarProducto);
router.put(
  "/editar/:id",
  administradorMw,
  upload.single("cover"),
  editValidator,
  actualizarProducto
);
router.delete("/delete/:id", administradorMw,borrar);
// rutas crud de carrusel de imagenes
 router.get("/agregarCarrusel", administradorMw, addCarouselGet);
 router.post('/agregarCarrusel',administradorMw,upload.single("carouselImage"),addCarouselPost);
  router.get("/carruselEditar/:id", administradorMw, editCarouselGet);
router.put(
  "/carruselEditar/:id",
  administradorMw,
  upload.single("carouselImage"),

  editCarouselUpdate
);
// router.delete("/carruselDelete/:id", borrarImages);

//CRUD autor
router.get('/agregarAutor',administradorMw,addAuthorGet);
router.post('/agregarAutor',administradorMw,addAuthorValidator,addAuthorPost);
router.get('/listadoAutores',administradorMw,authorList);
router.get('/editarAutor/:id',administradorMw,addAuthorValidator,editAuthorGet);
router.put('/editarAutor/:id',administradorMw,addAuthorValidator,editAuthorPut);
router.delete('/eliminarAutor/:id',administradorMw,deleteAuthor);
//CRUD género
router.get('/agregarGenero',administradorMw,addGenreGet);
router.post('/agregarGenero',administradorMw,addGenreEditorialValidator,addGenrePost);
router.get('/listadoGeneros',administradorMw,genreList);
router.get('/editarGenero/:id',administradorMw,addGenreEditorialValidator,editGenreGet);
router.put('/editarGenero/:id',administradorMw,addGenreEditorialValidator,editGenrePut);
router.delete('/eliminarGenero/:id',administradorMw,deleteGenre);
//CRUD editorial
router.get('/agregarEditorial',administradorMw,addEditorialGet);
router.post('/agregarEditorial',administradorMw,addGenreEditorialValidator,addEditorialPost);
router.get('/listadoEditorial',administradorMw,editorialList);
router.get('/editarEditorial/:id',administradorMw,addGenreEditorialValidator,editEditorialGet);
router.put('/editarEditorial/:id',administradorMw,addGenreEditorialValidator,editEditorialPut);
router.delete('/eliminarEditorial/:id',administradorMw,deleteEditorial);

//Agregar publicidad
router.get('/agregarPublicidad',administradorMw, addPromoGet);
router.post('/agregarPublicidad',administradorMw,upload.single("promoImage"),addPromoPost);

//Carrito y formulario de pago
router.get("/carrito", logueados, carrito);
router.get("/pago", logueados, pago);
// rutas de generos
router.get("/misterio", misterio);
router.get("/terror", terror);
router.get("/romance", romance);
router.get("/historica", historica);
router.get("/ciencia-ficcion", cienciaFiccion);
router.get("/policial", policial);
router.get("/thriller", thriller);
router.get("/fantasia", fantasia);
router.get("/juvenil", juvenil);

module.exports = router;
