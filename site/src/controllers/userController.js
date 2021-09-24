const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
<<<<<<< HEAD
const { User } = require("../database/models");
=======
const { Users } = require("../database/models");
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb

module.exports = {
  login: (req, res) => {
    return res.render("./users/login", { title: "LEAF | Login" });
  },

  loginUsuario: (req, res) => {
    let errors = validationResult(req);
    const { email, recordar } = req.body;
    if (errors.isEmpty()) {
<<<<<<< HEAD
       User.findOne({
=======
       Users.findOne({
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
        where: {
          email: req.body.email,
        },
        include: [
<<<<<<< HEAD
            {association: 'userRol'}
=======
            {association: 'rols'}
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
          ]
      })
      .then((user) =>{
  
<<<<<<< HEAD
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
     
=======
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
    
    
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
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
<<<<<<< HEAD
      User.create({
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name.trim(),
      lastname: req.body.lastname.trim(),
        nickName: req.body.nickName ? req.body.nickName.trim() : null,
        image: req.file
=======
      Users.create({
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre.trim(),
        apellido: req.body.apellido.trim(),
        category: "user",
        nickName: req.body.nickName ? req.body.nickName.trim() : null,
        image: req.file.trim()
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
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
<<<<<<< HEAD
    User.findByPk(req.session.userLogin.id)
=======
    Users.findByPk(req.session.userLogin.id)
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
    .then((user) => {
      return res.render("./users/perfil", {
        title: "LEAF | Mi perfil",
        user,
      });
    });
  },
  editarPerfil: (req, res) => {

<<<<<<< HEAD
    User.findByPk(req.params.id).then((user) => {
=======
    Users.findByPk(req.params.id).then((user) => {
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
      return res.render("./users/editPerfil", {
        user,
        title: "Editando perfil de " + user.name,
      });
    });
  },

  cambiarPerfil: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
<<<<<<< HEAD
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
=======
        Users.update({
            
        id: +req.params.id,
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre.trim(),
        apellido: req.body.apellido.trim(),
        category: "user",
        nickName: req.body.nickName ? req.body.nickName.trim() : user.nickName,
        image: req.file ? req.file.filename : user.image,
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
        },
        {
            where: {
                id: req.params.id
<<<<<<< HEAD
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
=======
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
>>>>>>> b3dafd9d52548ee56a37557ba7d6cd5a212985eb
        .then((user) => {
          return res.render("./users/perfil", {
            title: "LEAF | Mi perfil",
            user,
          });
        });

  },
};
