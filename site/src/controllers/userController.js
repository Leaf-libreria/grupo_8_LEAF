const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { User,Genre,Rol, Author, Editorial,Purchaseorder } = require("../database/models");
//Géneros, autores, editoriales ordenadas alfabéticamente para el header
const generos = Genre.findAll({ order: [['name', 'ASC']] });
const autores = Author.findAll({ order: [['nameLastname', 'ASC']] });
const editoriales = Editorial.findAll({ order: [['name', 'ASC']] });

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
        include: [{ association: "userRol" }],
      })
        .then((user) => {
          req.session.userLogin = {
            id: user.id,
            name: user.name,
            nickname: user.nickname ? user.nickname : null,
            rol: user.rolId,
            image: user.image,
          }
         
          recordar &&
            res.cookie("Leaf", req.session.userLogin, { maxAge: 120000 });
            req.session.cart = []

            Purchaseorder.findOne({
                    where : {
                        userId : req.session.userLogin.id,
                        status : 'pending'
                    },
                    include : [
                        {association : 'carts',
                            include : [
                                {association : 'libro',
                              
                                }
                            ]
                        }
                    ]
                })
                .then(order => {
                    if(order){
                        order.carts.forEach(item => {
                            let product = {
                              id: item.bookId,
                              nombre: item.libro.title,
                              imagen: item.libro.cover,
                              cantidad : item.quantity,
                              precio : item.libro.price,
                              total : item.libro.price * item.quantity,
                            purchaseorderId: order.id
                            }
                            req.session.cart.push(product)
                        });
                    }
                    return res.redirect('/')
                }).catch(error => console.log(error))
               
        })
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
        nickname: req.body.nickname ? req.body.nickname.trim() : null,
        image: req.file ? req.file.filename : "profile-users-default.png",
      })
        .then((user) => {
          req.session.userLogin = {
            id: user.id,
            name: user.name,
            nickname: user.nickname ? user.nickname : null,
            rol: user.rolId,
            image: user.image,
          };
          res.cookie("Leaf", req.session.userLogin, { maxAge: 120000 });

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
    User.findByPk(req.session.userLogin.id).then((user) => {
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
        title: `LEAF | Editando perfil`
      });
    });
  },

  cambiarPerfil: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
    
      User.update(
        {
        
          name: req.body.name.trim(),
          lastname: req.body.lastname.trim(),
          nickname: req.body.nickname ? req.body.nickname.trim() : null,
          image: req.file ? req.file.filename : req.body.image,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(() => {
          req.session.userLogin = {
            id : req.session.userLogin.id,
            name : req.body.name,
            image: req.file ? req.file.filename : req.session.userLogin.image,
            rol:req.session.userLogin.rol,
            email:req.session.userLogin.email,
          }
          
          res.redirect("/")
          
        })
        .catch((error) => console.log(error));
    } else {
      //metodo para borrar imagenes si hay error
      if (req.file) {
        let borrarImage = path.join( __dirname, "../../public/images/" + req.file.filename);
        fs.unlinkSync(borrarImage);
      }
      User.findByPk(req.params.id)
      .then((user) => {
        return res.render("./users/editPerfil", {
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Actualizar perfil",
          user,
        });
      })
      .catch((error) => console.log(error))

    }
  },
  //El usuario logueado pueda eliminar su cuenta
  eliminarCuenta:(req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => { 
        if (req.cookies.leaf) {
        res.cookie('Leaf', '', { maxAge: -1 });
      }      req.session.destroy()
    res.clearCookie("Leaf");
return res.redirect("/") })
      .catch((error) => console.log(error));
  },
  
  //Vista de listado de usuarios para administrador
  usuarioList: (req, res) => {
    generos;
    autores;
    editoriales;
    let usuarios = User.findAll({
      include:[
        { association: "userRol"}
      ],
      //Muestra primero los administradores (rolId=2)
      order:[['rolId','DESC']]
    })
    
    Promise.all([generos,autores,editoriales, usuarios])
      .then(([generos, autores, editoriales, usuarios]) => {
        return res.render('./users/usersList', {
          title: "LEAF | Administrador",
          usuarios,
          generos,
          autores,
          editoriales,
        });
      })
      .catch(error => console.log(error));
  },
  //Editar rol del usuario
  editRolUsuarioGet: (req, res) => {
    generos;
    autores; 
    editoriales;
    let userEdit = User.findByPk(req.params.id,{
      include: [
        { association: "userRol" }
      ]
    });
    let roles= Rol.findAll();
    Promise.all([generos, autores, editoriales, userEdit, roles])
      .then(([generos, autores, editoriales, userEdit, roles]) => {
        return res.render('./users/editRolUsuario', {
          title: "LEAF | Administrador",
          generos,
          autores, 
          editoriales,
          userEdit,
          roles,
        })
      })
      .catch(error => console.log(error));
  },
  editRolUsuarioPut: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      User.update({
        rolId: req.body.rolId
      },
        {
          where: {
            id: req.params.id
          }
        })
        .then(() => {
          return res.redirect("/users/listadoUsuarios");

        }).catch(error => console.log(error));
    } else {
      generos;
      autores; 
      editoriales;
      let userEdit = User.findByPk(req.params.id,{
        include: [
          { association: "userRol" }
        ]
      })
      let roles = Rol.findAll();

      Promise.all([generos, autores, editoriales, userEdit, roles])
        .then(([generos, autores, editoriales, userEdit, roles]) => {
          return res.render('./users/editRolUsuario', {
            userEdit,
            generos,
            autores, 
            editoriales,
            roles,
            errores: errors.mapped(),
            old: req.body,
            title: 'LEAF | Administrador'
          })
        })
    }
  },
  //El administrador puede eliminar cuenta de usuario
  deleteCuentaUsuario: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => { return res.redirect("/users/listadoUsuarios") })
      .catch((error) => console.log(error));
  },
};
