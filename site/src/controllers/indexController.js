const productos = require("../data/product_db");
const generos = require('../data/generos_db')
module.exports = {
    index: (req,res) => {
        return res.render("index",
        { title: "LEAF",
        productos,
        generos,
    })
    },

    preguntas: (req,res) =>{
        return res.render("preguntasFrecuentes",
        {title: 'LEAF | Preguntas frecuentes',
        generos,
    })
    },

    quienesSomos: (req,res) =>{
        return res.render("quienesSomos",
        {title: 'LEAF | Quiénes somos',
        generos,
    })
    }
}