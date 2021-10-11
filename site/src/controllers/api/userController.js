const db = require('../../database/models');

module.exports = {
    getEmails : (req,res) => {
        //trae de todos los usuarios la columna email
        db.User.findAll({
            attributes : ['email']
        })
        .then(users => {
            let emails = users.map(user => user.email) 
            return res.status(200).json({
                emails
            })
        })
        .catch(error => console.log(error))
    }
}