var express = require('express');
var router = express.Router();

const {login, registro,loginUsuario, perfil, editarPerfil} = require("../controllers/userController")
const loginValidator=require('../validations/loginValidator')

router.get('/login', login);
router.post('/login', loginValidator, loginUsuario);
router.get("/register", registro);
router.get('/perfil/:id', perfil);
router.get('/editarPerfil/:id', editarPerfil)
module.exports = router;
