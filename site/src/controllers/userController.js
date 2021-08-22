const { validationResult } = require('express-validator');
const { usuarios } = require('../data/users.json');

module.exports = {
    login: (req,res) => {
        return res.render("./users/login",
        {title: 'LEAF | Login'})
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
    registro: (req,res) =>{
        return res.render("./users/register",
        {title: 'LEAF | Registro'})
    },

}