const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { User } = require("../database/models");

module.exports = {
  login: (req, res) => {
    return res.render("./users/login", { title: "LEAF | Login" });
  },

  loginUsuario: (req, res) => {
    let errors = validationResult(req);
    const { email, recordar } = req.body;
    if (errors.isEmpty()) {
       User.findOne({
        where: {
          email: req.body.email,
        },
        include: [
            {association: 'userRol'}
          ]
      })
      .then((user) =>{
  
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          rol: user.rolId,
          image: user.image,
        };
        recordar && res.cookie("Leaf", req.session.userLogin, { maxAge: 120000 });
        
          return res.redirect("/");
      })
      .catch((error)=> console.log(error))
     
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
      User.create({
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name.trim(),
      lastname: req.body.lastname.trim(),
        nickName: req.body.nickName ? req.body.nickName.trim() : null,
        image: req.file
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
    User.findByPk(req.session.userLogin.id)
    .then((user) => {
      return res.render("./users/perfil", {
        title: "LEAF | Mi perfil",
        user,
      });
    });
  },
  editarPerfil: (req, res) => {

    User.findByPk(req.params.id).then((user) => {
      return res.render("./users/editPerfil", {
        user,
        title: "Editando perfil de " + user.name,
      });
    });
  },

  cambiarPerfil: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      User.findByPk(req.params.id)
      .then((user) =>{
        user
      })
        User.update({
        email: req.body.email.trim(),
        name: req.body.name.trim(),
        lastname: req.body.lastname.trim(),
        nickname: req.body.nickname ? req.body.nickname.trim() : user.nickname,
        image: req.file ? req.file.filename : req.body.image,
        },
        {
            where: {
                id: req.params.id
            }
        })
        User.findByPk(req.body.id)
        .then((user) =>{
          
          res.redirect('/')
        })
        .catch((error) => console.log(error))
    } else {
    
      req.file ?   file =>
        fs.unlinkSync(path.join(__dirname,file))
    .deleteFile(`../public/images/${req.file.filename}`) : null
      User.findByPk(req.params.id)
      .then(user => {
        return res.render("./users/editPerfil", {
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Registro",
         user
        });
      })
    
    }
  },
  actualizarImagen: (req, res) => {
      User.update({
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
