const fs = require('fs');
const path = require('path');

const {productos} = require("../data/product_db");
const generos = require('../data/generos_db')
module.exports = {
    index: (req,res) => {
        return res.render("index",
        { title: "LEAF",
        productos,
        generos,
        masVendidos : productos.filter(producto => producto.categoria === "Mas vendidos").splice(0,4),
        /* con el splice cortamos el array */
        novedades : productos.filter(producto => producto.categoria === "Novedades").splice(0,3),
        recomendados : productos.filter(producto => producto.categoria === "Recomendados").splice(0,3)
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
    },
    search :(req,res) => {
        if(req.query.search.trim() != ""){
          let result = productos.filter(producto => producto.titulo.toLowerCase().includes(req.query.search.toLowerCase().trim())|| producto.genero.toLowerCase().includes(req.query.search.toLowerCase().trim()));
          return res.render('results', {
            title: 'LEAF | Resultados',
            result,
            search : req.query.search.trim(),
            generos,
            productos,
          })
        }else{
            return "no hay resultados para tu busqueda"
        }
      },
}