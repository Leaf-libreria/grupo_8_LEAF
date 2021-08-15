var express = require('express');
var router = express.Router();

const {login, registro, perfil, editarPerfil} = require("../controllers/userController")


router.get('/login', login);
router.get("/register", registro);
router.get('/perfil', perfil);
router.get('/editarPerfil', editarPerfil)
module.exports = router;
