var express = require('express');
var router = express.Router();

const {login, registro} = require("../controllers/userController")


router.get('/login', login);
router.get("/register", registro);

module.exports = router;
