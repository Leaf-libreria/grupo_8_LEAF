var express = require("express");
var router = express.Router();
const path = require("path");
//Validaciones para CRUD productos
const addValidator = require("../validations/addProductValidator");
const editValidator = require("../validations/editProductValidator");
const authorValidator = require("../validations/addAuthorValidator");
const genreEditorialValidator = require("../validations/addGenreEditorialValidator");
const addCarouselImageValidator = require("../validations/addCarouselImageValidator");
const payFormValidator = require("../validations/payFormValidator");
const addPromoValidator = require("../validations/addPromoValidator")
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
  actualizarProducto,
  addProducto,
  borrar,
  verMasNovedades,
  verMasRecomendados,
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
  editPromoGet,
  editPromoPut,
  deletePromo,
  editCarouselGet,
  editCarouselUpdate,
  deleteImageCarousel,
  commonViews,
  viewEditorials,
  pagoCard,
  genresViews,
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

//CRUD publicidad
router.get('/listadoPublicidad',administradorMw, addPromoGet);
router.post('/listadoPublicidad',administradorMw, upload.single("promos"),addPromoValidator, addPromoPost);
router.get("/editarPublicidad/:id",administradorMw, editPromoGet);
router.put("/editarPublicidad/:id",administradorMw, upload.single("promos"), addPromoValidator,editPromoPut);  
router.delete('/eliminarPublicidad/:id',administradorMw,deletePromo);  


//Carrito y formulario de pago
router.get("/carrito", logueados, carrito);
router.get("/pago", logueados, pago);
router.post("/pago", logueados, payFormValidator, pagoCard);
// ruta de generos
router.get("/genero/:name", genresViews);

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
