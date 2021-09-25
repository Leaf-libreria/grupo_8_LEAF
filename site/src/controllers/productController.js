const db = require('../database/models');
const { validationResult } = require('express-validator');
module.exports = {
  libros: (req, res) => {   
    let productos=db.Book.findAll({
      include:[{association:'formato'},
    {association:'genero'},
      {association:'autor'}],
      where: {
        formatId: 1
      }
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])=>
      res.render("./products/libros", {
        title: "LEAF | Libros",
        productos,
       generos,
      })).catch(error => console.log(error));
  },
  ebooks: (req, res) => {
   let productos= db.Book.findAll({
     include: [{ association: 'formato' },
     { association: 'genero' },
     { association: 'autor' }],
      where: {
        formatId: 2
      }
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) =>
      res.render("./products/ebooks", {
        title: "LEAF | E-books",
        productos,
        generos
      })).catch(error => console.log(error));
  },

  verMasVendidos: (req, res) => {
    let productos=db.Book.findAll({
      include:[{association:'autor'},     
      {association:'categoria'}],
      where: {
        categoryId: 1
      }
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])  =>{
      return res.render("verMasVendidos",
      { 
        title: "LEAF | Más vendidos", productos, generos 
    })
      }).catch(error => console.log(error));
  },

  verMasNovedades: (req, res) => {
    let productos = db.Book.findAll({
      include: [{ association: 'autor' },
      { association: 'categoria' }],
      where: {
        categoryId: 2
      }
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
      return res.render("verMasNovedades", {
        title: "LEAF | Más novedades",
        productos,
        generos
      })
    }).catch(error => console.log(error));
  },

  verMasRecomendados: (req, res) => {
    let productos = db.Book.findAll({
      include: [{ association: 'autor' },
      { association: 'categoria' }],
      where: {
        categoryId: 3
      }
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
      return res.render("verMasRecomendados", { title: "LEAF | Más recomendados", productos, generos 
    })
  }).catch(error => console.log(error));

  },

  detail: (req, res) => {
    let producto = db.Book.findOne({
      where: {
        id: req.params.id
      },

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
    });
    let recomendados = db.Genre.findAll({
      where: {
        id: 3,
      },
      include: [{ association: 'libros' }],
      limit:3,
    });
    let generos = db.Genre.findAll()
    console.log(generos);
    Promise.all([producto, recomendados,generos])
      .then(([producto, recomendados,generos]) => {
        return res.render("./products/productDetail", {
          title: 'LEAF | Detalle',
          producto,
          recomendados,
          generos
        })
      }).catch(error => console.log(error));
  },
  administrador: (req, res) => {
  let productos = db.Book.findAll({

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
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
        res.render("./products/admin", {
          title: "LEAF | Administrador",
          productos,
          generos
        }); //Lista todos los productos
      })
  },
  editarProducto: (req, res) => {
    let generos = db.Genre.findAll()
    let productEdit = db.Book.findByPk(req.params.id);

    Promise.all([generos, productEdit])
      .then(([generos, productEdit]) => {
        return res.render("./products/editProduct", {
          title: 'Editando ' + productEdit.title,
          generos,
          productEdit,//producto editado
        });
      })
  },
  actualizarProducto: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {

      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, language, format, stock } = req.body;

      let productos = db.Book.findAll({

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
      })
      Book.update({
          title: title.trim(),
          author: author.trim(),
          price: price.trim(),
          category: category.trim(),
          genre: genre.trim(),
          synopsis: synopsis.trim(),
          slogan: slogan.trim(),
          stars: stars.trim(),
          editorial: editorial.trim(),
          isbn: isbn.trim(),
          pages: pages.trim(),
          language: language.trim(),
          format: format.trim(),
          stock: stock.trim(),
          cover: req.file.filename.trim()
        },
        {
          where: {
            id: req.params.id
          }
        });
        let generos = db.Genre.findAll()
    Promise.all([productos, generos])
          .then(([productos, generos]) => {
      res.redirect('/products/administrador',{
        productos,generos
      })
          }).catch(error => console.log(error));
    } else {
      let productos = db.Book.findAll({

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
      })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
          return res.render('./products/editProduct', {
            productos,
            generos,
            errores: errors.mapped(),
            old: req.body,
            productEdit, 
            title: 'LEAF | Administrador',
          });
        })

    }
  },
  addProducto: (req, res) => {
    let productos = db.Book.findAll({

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
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos,generos]) => {
        return res.render('./products/addProduct', {
          title: 'LEAF | Administrador',
          productos,
          generos
        });
      }).catch(error => console.log(error))
  },
  agregarProducto: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, language, format, stock } = req.body;
      db.Book.create({
        title: title.trim(),
        author: author.trim(),
        price: price.trim(),
        category: category.trim(),
        genre: genre.trim(),
        synopsis: synopsis.trim(),
        slogan: slogan.trim(),
        stars: stars.trim(),
        editorial: editorial.trim(),
        isbn: isbn.trim(),
        pages: pages.trim(),
        language: language.trim(),
        format: format.trim(),
        stock: stock.trim(),
        cover: req.file.filename.trim()
      })
      let productos = db.Book.findAll({
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
      })
      let generos = db.Genre.findAll()
      Promise.all([productos, generos])
      .then(([productos,generos]) => {
        return res.redirect('/products/administrador',{
          productos,
          generos
        });
      }).catch(error => console.log(error))
    } else {
      let productos = db.Book.findAll({
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
      })
      let generos = db.Genre.findAll()
      Promise.all([productos, generos])
        .then(([productos, generos]) => {
          return res.render('./products/addProduct', {
            productos,
            generos,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
    }
  },
  borrar: (req, res) => {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.redirect("/products/administrador"))
      .catch(error => console.log(error));
  },

  carrito: (req, res) => {
    let productos = db.Book.findAll({
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
    })
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) =>
    {return res.render("./products/productCart", { title: "LEAF | Carrito", productos,generos, },
    )}
      )},
  pago: (req, res) => {
    let producto = db.Book.findAll({
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
    })
    let generos = db.Genre.findAll()
    Promise.all([producto, generos])
      .then(([producto, generos]) =>{
    return res.render("./products/payForm", {
      title: "LEAF | Finaliza tu compra",
      producto,
      generos,
      costoEnvio: producto.price,
      libroComprado: producto.id==1
    })
    })
  },

  // controladores para generos
  policial: (req, res) => {
    let productos=db.Book.findAll({
      where: {
        genreId: 1,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })
    
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])  =>
      res.render("./products/generos/policial", {
        title: "LEAF | Policial",
        productos,
        generos,
      })).catch(error => console.log(error));
  },
  romance: (req, res) => {
    let productos = db.Book.findAll({
      where: {
        genreId: 4,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })

    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) =>
        res.render("./products/generos/romance", {
          title: "LEAF | Romance",
          productos,
          generos,
        })).catch(error => console.log(error));
  },

  misterio: (req, res) => {
    let productos = db.Book.findAll({
      where: {
        genreId: 5,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })

    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) =>
        res.render("./products/generos/misterio", {
          title: "LEAF | Misterio",
          productos,
          generos,
        })).catch(error => console.log(error));
  },
  terror: (req, res) => {
    let productos=db.Book.findAll({
      where: {
        genreId: 7,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })
    
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])  =>
      res.render("./products/generos/terror", {
        title: "LEAF | Terror",
        productos,
        generos,
      })).catch(error => console.log(error));
  },
  cienciaFiccion: (req, res) => {
    let productos=db.Book.findAll({
      where: {
        genreId: 3,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })
    
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])  =>
      res.render("./products/generos/ciencia-ficcion", {
        title: "LEAF | Ciencia Ficción",
        productos,
        generos,
      })).catch(error => console.log(error));
  },

  juvenil: (req, res) => {
    let productos=db.Book.findAll({
      where: {
        genreId: 6,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })
    
    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos])  =>
      res.render("./products/generos/juvenil", {
        title: "LEAF | Juvenil",
        productos,
        generos,
      })).catch(error => console.log(error));
  },
  historica: (req, res) => {
    let productos = db.Book.findAll({
      where: {
        genreId: 2,
      },
      include: [{ association: 'genero' }, {
        association: 'autor'
      },],
    })

    let generos = db.Genre.findAll()
    Promise.all([productos, generos])
      .then(([productos, generos]) =>
        res.render("./products/generos/misterio", {
          title: "LEAF | Misterio",
          productos,
          generos,
        })).catch(error => console.log(error));
  },
};
