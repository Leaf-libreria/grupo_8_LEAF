const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
  index: (req, res) => {
    let productos = db.Book.findAll(
      {
        include: [
          {
            association: 'categoria'
          },
          {
            association: 'editorial'
          },
          {
            association: 'estrella'
          },
          {
            association: 'formato'
          },
          {
            association: 'autor'
          },
          {
            association: 'genero'
          },
        ]
      }
    );
    let masVendidos = db.Category.findOne({
      where: {
        name: 'Más vendidos',
      },
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
    Promise.all([productos, masVendidos, novedades, recomendados])
      .then(([productos, masVendidos, novedades, recomendados]) => {
        return res.render("index",
          {
            title: "LEAF",
            productos,
            masVendidos,
            novedades,
            recomendados,
            // genres, *ver si lo necesita*
          })
      }).catch(error => console.log(error))
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
  }
}