var express = require('express');
var router = express.Router();

const {login, registro,loginUsuario} = require("../controllers/userController")
const loginValidator=require('../validations/loginValidator')

router.get('/login', login);
router.post('/login', loginValidator, loginUsuario);
router.get("/register", registro);

module.exports = router;
