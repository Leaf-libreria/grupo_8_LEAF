var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");

const {login, crearRegistro, registro, perfil, editarPerfil, loginUsuario, cerrarSesion} = require("../controllers/userController")
const loginValidator=require('../validations/loginValidator');
const registerValidator=require('../validations/registerValidator');


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    },
})


var upload = multer({storage : storage});





router.get('/login', login);
router.post('/login', loginValidator, loginUsuario);
router.get("/register", registro);
router.post("/register", registerValidator, crearRegistro);
router.get('/perfil/:id', perfil);
router.get('/editarPerfil/:id', editarPerfil)
router.get('/logout',cerrarSesion);
module.exports = router;
