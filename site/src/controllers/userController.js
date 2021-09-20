const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { Users } = require("../database/models");

module.exports = {
  login: (req, res) => {
    return res.render("./users/login", { title: "LEAF | Login" });
  },

  loginUsuario: (req, res) => {
    let errors = validationResult(req);
    const { email, recordar } = req.body;
    if (errors.isEmpty()) {
       Users.findOne({
        where: {
          email: req.body.email,
        },
        include: [
            {association: 'rols'}
          ]
      })
      .then((user) =>{
  
          return res.redirect("/");
      })
      .catch((error)=> console.log(error)),

        req.session.userLogin = {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        image: user.image,
      };
      if (recordar) {
        res.cookie("Leaf", req.session.userLogin, { maxAge: 120000 });
      }
    
    
    } else {
      return res.render("./users/login", {
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Login",
      });
    }
  },
  cerrarSesion: (req, res) => {
    req.session.destroy();
    res.clearCookie("Leaf");
    return res.redirect("/");
  },

  registro: (req, res) => {
    return res.render("./users/register", { title: "LEAF | Registro" });
  },
  crearRegistro: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      Users.create({
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre.trim(),
        apellido: req.body.apellido.trim(),
        category: "user",
        nickName: req.body.nickName ? req.body.nickName.trim() : null,
        image: req.file.trim()
          ? req.file.filename
          : "profile-users-default.png",
      })

        //     req.session.userLogin = {
        //         id : user.id,
        //         nombre : user.nombre,
        //         category: user.category,
        //         image: user.image,

        //    }
        .then((user) => {
          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      if (req.file) {
        //Para no guardar la imagen si hay errores
        let deleteImage = path.join(
          __dirname,
          "../../public/images/" + req.file.filename
        );
        fs.unlinkSync(deleteImage);
      }
      return res.render("./users/register", {
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Registro",
      });
    }
  },

  perfil: (req, res) => {
    Users.findByPk(req.session.userLogin.id)
    .then((user) => {
      return res.render("./users/perfil", {
        title: "LEAF | Mi perfil",
        user,
      });
    });
  },
  editarPerfil: (req, res) => {

    Users.findByPk(req.params.id).then((user) => {
      return res.render("./users/editPerfil", {
        user,
        title: "Editando perfil de " + user.name,
      });
    });
  },

  cambiarPerfil: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        Users.update({
            
        id: +req.params.id,
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre.trim(),
        apellido: req.body.apellido.trim(),
        category: "user",
        nickName: req.body.nickName ? req.body.nickName.trim() : user.nickName,
        image: req.file ? req.file.filename : user.image,
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(()=> res.redirect('/'))
        .catch((error) => console.log(error))
    } else {
      if (req.file) {
        //Para no guardar la imagen si hay errores
        let deleteImage = path.join(
          __dirname,
          "../../public/images/" + req.file.filename
        );
        fs.unlinkSync(deleteImage);
      }
      return res.render("./users/editPerfil", {
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Registro",
       
      });
    }
  },
  actualizarImagen: (req, res) => {
      Users.update({
        image: req.file ? req.file.filename : user.image,
      },
        {
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
          return res.render("./users/perfil", {
            title: "LEAF | Mi perfil",
            user,
          });
        });

  },
};
