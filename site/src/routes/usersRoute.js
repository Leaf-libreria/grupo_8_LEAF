var express = require('express');
var router = express.Router();

const {login, registro, perfil, editarPerfil} = require("../controllers/userController")


router.get('/login', login);
router.get("/register", registro);
router.get('/perfil/:id', perfil);
router.get('/editarPerfil/:id', editarPerfil)
module.exports = router;
