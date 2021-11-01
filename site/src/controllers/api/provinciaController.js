const db = require('../../database/models');

module.exports = {
    getProvincias: (req,res) => {
        //trae de todos los usuarios la columna email
        db.Provincia.findAll({})
        .then(provincias => {
            return res.status(200).json({
                provincias
            })
        })
        .catch(error => console.log(error))
    }
}