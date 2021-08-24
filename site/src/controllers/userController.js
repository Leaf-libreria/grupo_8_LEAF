const users = require("../data/users_db");
const bcrypt =require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarios } = require('../data/users.json');

module.exports = {
    login: (req, res) => {
        return res.render("./users/login", { title: "LEAF | Login" });
    },

        // password: bcrypt.hashSync(password,10),
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
    registro: (req,res) =>{
        return res.render("./users/register",
        {title: 'LEAF | Registro'})
    },
   processRegister:(req,res) =>{

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
    },
};
