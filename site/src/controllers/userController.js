const bcrypt =require('bcryptjs');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { users,guardar } = require('../data/users_db');


module.exports = {
    login: (req, res) => {
        return res.render("./users/login", { title: "LEAF | Login" });
    },

       
    loginUsuario:(req,res)=>{
        let errors = validationResult(req);
        let { email } = req.body;
        if (errors.isEmpty()) {
            let user = users.find(user => user.email === email);
            console.log(user);
            req.session.userLogin = {
                id : user.id,
                nombre : user.nombre,
                 category: user.category,
              
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
                password: bcrypt.hashSync(req.body.password,10),
                nombre : req.body.nombre.trim(),
                apellido : req.body.apellido.trim(),
                category : "user",
                nickName : req.body.nickName ? req.body.nickName.trim() : null,
                image : req.file ? req.file.filename : 'profile-users-default.png'
            }
            console.log(req.body)
            users.push(usuario);
            guardar(users);
            return res.redirect('/perfil/:id');
            }else{
                if (req.file) { //Para no guardar la imagen si hay errores
                let deleteImage = path.join(
                    __dirname, '../../public/images/'+req.file.filename);
                fs.unlinkSync(deleteImage);
                }
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

