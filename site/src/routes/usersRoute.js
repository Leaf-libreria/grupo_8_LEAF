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


var upload = multer({storage : storage});


const {login, registro, perfil, editarPerfil} = require("../controllers/userController")


router.get('/login', login);
router.get("/register", registro);
router.get('/perfil/:id', perfil);
router.get('/editarPerfil/:id', editarPerfil)
module.exports = router;
