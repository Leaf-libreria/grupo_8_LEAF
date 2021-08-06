var express = require('express');
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



const {verMas, detail, administrador, carrito, pago, agregarProducto, editarProducto} = require("../controllers/productController")


router.get('/', verMas);
router.get("/detalle", detail);
router.get("/administrador", administrador);
// Carga de productos
router.get("/agregar", agregarProducto);
router.get("/editar", editarProducto);
router.get("/carrito", carrito);
router.get("/pago", pago);


module.exports = router;

