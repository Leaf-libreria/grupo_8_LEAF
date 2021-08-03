const productos = require("../data/product_db");
const generos = require('../data/generos_db')
module.exports = {
    index: (req,res) => {
        return res.render("index",
        { title: "LEAF",
        productos,
        generos,
        masVendidos : productos.filter(producto => producto.category === "masVendidos"),
        novedades : productos.filter(producto => producto.category === "novedades"),
        recomendados : productos.filter(producto => producto.category === "recomendados")
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