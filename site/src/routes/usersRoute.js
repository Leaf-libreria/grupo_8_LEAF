var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
//middleware acceso administrador
const administradorMw = require("../middlewares/adminUserCheck");


const {
  login,
  crearRegistro,
  registro,
  perfil,
  editarPerfil,
  loginUsuario,
  cerrarSesion,
  cambiarPerfil,
  usuarioList,
  editRolUsuarioPut,
  editRolUsuarioGet,
  deleteCuentaUsuario,
} = require("../controllers/userController");
//validaciones
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const changeProfile = require("../validations/changeProfile");
//middleware acceso usuarios logueados
const logueados = require("../middlewares/loggedUser");

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

var upload = multer({ storage: storage });

router.get("/login", login);
router.post("/login", loginValidator, loginUsuario);
router.get("/register", registro);
router.post(
  "/register",
  upload.single("image"),
  registerValidator,
  crearRegistro
);
router.get("/perfil/:id", logueados, perfil);
router.get("/editarPerfil/:id", logueados, editarPerfil);
router.put("/editarPerfil/:id",upload.single("image"),changeProfile,cambiarPerfil);
router.get("/logout", cerrarSesion);

//Vista de listado de usuarios para administrador
router.get("/listadoUsuarios",administradorMw,usuarioList)
//Edición de rol de usuario
router.get("/editarRolUsuario/:id",administradorMw, editRolUsuarioGet)
router.put("/editarRolUsuario/:id", administradorMw, editRolUsuarioPut)
//Eliminar cuenta del usuario
router.delete("/eliminarUsuario/:id", administradorMw, deleteCuentaUsuario)

module.exports = router;
