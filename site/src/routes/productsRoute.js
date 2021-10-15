var express = require("express");
var router = express.Router();
const path = require("path");
//Validaciones para CRUD productos
const addValidator = require("../validations/addProductValidator");
const editValidator = require("../validations/editProductValidator");
const authorValidator = require("../validations/addAuthorValidator");
const genreEditorialValidator = require("../validations/addGenreEditorialValidator");
const addCarouselImageValidator = require("../validations/addCarouselImageValidator");
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
  authorList,
  addAuthorPost,
  addAuthorGet,
  editAuthorPut,
  editAuthorGet,
  deleteAuthor,
  addEditorialGet,
  addEditorialPost,
  editEditorialPut,
  deleteEditorial,
  editEditorialGet,
  editorialList,
  addGenreGet,
  addGenrePost,
  genreList,
  editGenreGet,
  editGenrePut,
  deleteGenre,
  addPaymentGet,
  addPaymentPost,
  paymentMethodList,
  editPaymentGet,
  editPaymentPut,
  deletePayment,
  addCarouselGet,
  addCarouselPost,
  addPromoGet,
  addPromoPost,
  editCarouselGet,
  editCarouselUpdate,
  deleteImageCarousel,
  commonViews,
  viewEditorials,
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
router.post("/agregar",administradorMw,upload.single("cover"),addValidator,agregarProducto);
router.get("/editar/:id", administradorMw, editarProducto);
router.put("/editar/:id",administradorMw,upload.single("cover"),editValidator, actualizarProducto);
router.delete("/delete/:id", administradorMw,borrar);


// rutas crud de carrusel de imagenes
router.get("/agregarCarrusel", administradorMw, addCarouselGet);
router.post("/agregarCarrusel", administradorMw, upload.single("carouselImage"),addCarouselImageValidator, addCarouselPost);
router.get("/carruselEditar/:id", administradorMw, editCarouselGet);
router.put("/carruselEditar/:id",administradorMw, upload.single("carouselImage"),addCarouselImageValidator, editCarouselUpdate);
router.delete("/carruselBorrar/:id", deleteImageCarousel);

//CRUD autor
router.get('/agregarAutor',administradorMw,addAuthorGet);
router.post('/agregarAutor',administradorMw,authorValidator,addAuthorPost);
router.get('/listadoAutores',administradorMw,authorList);
router.get('/editarAutor/:id',administradorMw,authorValidator,editAuthorGet);
router.put('/editarAutor/:id',administradorMw,authorValidator,editAuthorPut);
router.delete('/eliminarAutor/:id',administradorMw,deleteAuthor);
//CRUD género
router.get('/agregarGenero',administradorMw,addGenreGet);
router.post('/agregarGenero',administradorMw,genreEditorialValidator,addGenrePost);
router.get('/listadoGeneros',administradorMw,genreList);
router.get('/editarGenero/:id',administradorMw,genreEditorialValidator,editGenreGet);
router.put('/editarGenero/:id',administradorMw,genreEditorialValidator,editGenrePut);
router.delete('/eliminarGenero/:id',administradorMw,deleteGenre);
//CRUD editorial
router.get('/agregarEditorial',administradorMw,addEditorialGet);
router.post('/agregarEditorial',administradorMw,genreEditorialValidator,addEditorialPost);
router.get('/listadoEditorial',administradorMw,editorialList);
router.get('/editarEditorial/:id',administradorMw,genreEditorialValidator,editEditorialGet);
router.put('/editarEditorial/:id',administradorMw,genreEditorialValidator,editEditorialPut);
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

//CRUD métodos de pago
router.get('/agregarMetodoPago',administradorMw,addPaymentGet);
router.post('/agregarMetodoPago',administradorMw,genreEditorialValidator,addPaymentPost);
router.get('/listadoMetodosPago',administradorMw,paymentMethodList);
router.get('/editarMetodosPago/:id',administradorMw,genreEditorialValidator,editPaymentGet);
router.put('/editarMetodosPago/:id',administradorMw,genreEditorialValidator,editPaymentPut);
router.delete('/eliminarMetodosPago/:id',administradorMw,deletePayment);

//Ruta vista libros por autor
router.get('/autor/:nameLastname',commonViews)
//Ruta libros por editorial
router.get('/editorial/:name',viewEditorials)

module.exports = router;
