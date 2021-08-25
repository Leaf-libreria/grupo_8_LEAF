const { body, check } = require('express-validator');
const { users } = require('../data/users.json');

module.exports = [
  body('email')
    .custom((value,{req}) => {
        let usuario = users.find(usuario => usuario.email === value && bcrypt.compareSync(req.body.password,usuario.password));
        if (usuario){
            return true
        }else{
            return false
        }
    }).withMessage('credenciales inválidas')
]
