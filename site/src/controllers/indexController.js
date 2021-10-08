const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const generos= db.Genre.findAll();

module.exports = {
  index: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        {
          association: "categoria",
        },
        {
          association: "editorial",
        },
        {
          association: "estrella",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });
    let masVendidos = db.Book.findAll({
      where: {
        categoryId: 1,
      },
      include: [{ association: "genero" },
       { association: "categoria" },
       { association: "autor" }],
      
      limit: 4,
    });
    let novedades = db.Book.findAll({
      where: {
        categoryId: 2,
      },
      include: [{ association: "categoria" }],
      limit: 3,
    });
    let recomendados = db.Book.findAll({
      where: {
        categoryId: 3,
      },
      include: [{ association: "categoria" }],
      limit: 3,
    });
generos
    Promise.all([productos, masVendidos, novedades, recomendados, generos])
      .then(([productos, masVendidos, novedades, recomendados, generos]) => {
        return res.render("index", {
          title: "LEAF",
          productos,
          masVendidos,
          novedades,
          recomendados,
          generos,
        });
      })
      .catch((error) => console.log(error));
  },
  preguntas: (req, res) => {
generos
.then((generos) => {
    return res.render("preguntasFrecuentes", {
      title: "LEAF | Preguntas frecuentes",
      generos,
    });
  })
  },
  quienesSomos: (req, res) => {
generos
    .then((generos) => {
  return res.render("quienesSomos", {
    title: "LEAF | Quiénes somos",
    generos
   
  });
})

  
  },
  search: (req, res) => {
    if (req.query.search.trim() != "") {
    let result =  db.Book.findAll({
        include: [
          { association: "autor" },
          { association: "genero" },
          { association: "formato" },
          { association: "editorial" },
        ],
        where: {
          title: { [Op.substring]: req.query.search } 
        },
      });
generos      
      Promise.all([result, generos])
        .then(([result, generos]) => {
          return res.render("results", {
            title: "LEAF | Resultados",
            result,
            search: req.query.search.trim(),
            generos,
          });
        })
        .catch((error) => console.log(error));
    }
  },
};
