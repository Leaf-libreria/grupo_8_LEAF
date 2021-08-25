const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { users,guardar } = require('../data/users_db');


module.exports = {
    login: (req, res) => {
        return res.render("./users/login", { title: "LEAF | Login" });
    },

    loginUsuario:(req,res)=>{
        let errors = validationResult(req);
        let { email } = req.body;
        if (errors.isEmpty()) {
            return res.redirect('/');
        }else{
            return res.render('./users/login', {
              errores: errors.mapped(),
              old: req.body,
              title: 'LEAF | Login',
            });
        }
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
            return res.redirect('/');
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

