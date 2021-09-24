const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
  index: (req, res) => {

    let masVendidosLibros = db.Book.findOne({
      where: {
        categoryId : 1,
      },
          include : [
            {association : 'genero'}
          ],
          include : [
            {association : 'autor'}
          ]
      ,
      limit: 4
    })
  
    let novedades = db.Category.findOne({
      where: {
        name: 'Novedades',
      },
      limit: 3
    })
    let recomendados = db.Category.findOne({
      where: {
        name: 'Recomendados',
      },
      limit: 3
    })
    let generos = db.Genre.findAll()
   
    Promise.all([ masVendidosLibros, novedades, recomendados, generos])
      .then(([ masVendidosLibros, novedades, recomendados, generos]) => {
      
        return res.render("index",
      
          {
            title: "LEAF",
            masVendidosLibros: masVendidosLibros.libros,
         
            novedades,
            recomendados,
            generos,
          })

      })
      console.log(masVendidos)
      .catch(error => console.log(error))
    
  },
  preguntas: (req, res) => {
    return res.render("preguntasFrecuentes",
      {
        title: 'LEAF | Preguntas frecuentes',
        genres,
      })
  },

  quienesSomos: (req, res) => {
    return res.render("quienesSomos",
      {
        title: 'LEAF | Quiénes somos',
        genres,
      })
  },
  search: (req, res) => {
    if (req.query.search.trim() != "") {
      db.Book.findAll({
        include: [
          { association: autor },
          { association: genero },
          { association: formato },
          { association: editorial },
        ],
        where: {
          [Op.or]: [

          ]
        }
      }).then(result => res.render('results', {
        title: 'LEAF | Resultados',
        result,
        search: req.query.search.trim(),
        productos,
      })).catch(error => console.log(error));
    }
  },
 
}