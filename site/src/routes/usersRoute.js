var express = require('express');
var router = express.Router();

const {login, registro, perfil} = require("../controllers/userController")


router.get('/login', login);
router.get("/register", registro);
router.get('/perfil', perfil)
module.exports = router;
