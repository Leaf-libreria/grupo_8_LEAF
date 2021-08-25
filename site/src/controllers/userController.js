const bcrypt =require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarios } = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const { users,guardar } = require('../data/users_db');


module.exports = {
    login: (req, res) => {
        return res.render("./users/login", { title: "LEAF | Login" });
    },

        // password: bcrypt.hashSync(password,10),
    loginUsuario:(req,res)=>{
        let errors = validationResult(req);
        let { email } = req.body;
        if (errors.isEmpty()) {
            let usuario = users.find(user => user.email === email)
            req.session.userLogin = {
                id : user.id,
                nombre : user.nombre,
                rol : user.rol,
                foto_perfil : user.image,
            }

            return res.redirect('/');

        }else{
            return res.render('./users/login', {
              errores: errors.mapped(),
              old: req.body,
              title: 'LEAF | Login',
            });
        }
},
cerrarSesion : (req,res) => {
    req.session.destroy();
    res.cookie('Leaf',null,{maxAge:-1})
    return res.redirect('/')
},
  
    registro: (req, res) => {
    return res.render("./users/register", { title: "LEAF | Registro" });
},
    crearRegistro: (req,res) =>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usuario = {
                id :  users.length > 0 ? users[users.length - 1].id + 1 : 1, 
                email : req.body.email.trim(),
                password : req.body.password,
                nombre : req.body.nombre.trim(),
                apellido : req.body.apellido.trim(),
                category : "user",
                nickName : req.body.nickName ? req.body.nickName.trim() : null,
            }
            console.log(req.body)
            users.push(usuario);
            guardar(users);
            return res.redirect('/perfil/:id');
            }else{
                return res.render('./users/register', {
                  errores: errors.mapped(),
                  old: req.body,
                  title: 'LEAF | Registro',
                });
        }
    },

    perfil: (req, res) => {
     users.find((user) => user.id === +req.params.id);
        return res.render("./users/perfil", {
            title: "LEAF | Mi perfil",
            usuarioPerfil:  users.find((user) => user.id === +req.params.id),
        });
    },
    editarPerfil: (req, res) => {
        let userEdit = users.find((user) => user.id === +req.params.id);
        return res.render("./users/editPerfil", {
            title: "Editando perfil " + userEdit.first_name,
            userEdit,
        });
    }
};

