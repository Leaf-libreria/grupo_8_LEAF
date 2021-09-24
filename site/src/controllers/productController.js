const db = require('../database/models');
const { validationResult } = require('express-validator');
module.exports = {
  libros: (req, res) => {   
    let productos=db.Book.findAll({
      include:['formato'],
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
      include:['formato'],
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
        categoryId: 1
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

      let productos=Book.update(
        {
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
        }
      ).then(() => res.redirect('/products/administrador')).catch(error => console.log(error));
    } else {
      let productos=db.Book.findAll()
        .then(productos => {
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
    let productos=db.Book.findAll()
      .then(productos => {
        return res.render('./products/addProduct', {
          title: 'LEAF | Administrador',
          productos,
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
      }).then(() => {
        return res.redirect('/products/administrador');
      }).catch(error => console.log(error))
    } else {
      db.Book.findAll()
        .then(book => {
          return res.render('./products/addProduct', {
            book,
            genres, /* ver si lo necesita */
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
    return res.render("./products/productCart", { title: "LEAF | Carrito", generos, },
    );
  },
  pago: (req, res) => {
    return res.render("./products/payForm", {
      title: "LEAF | Finaliza tu compra",
      productos,
      costoEnvio,
      // libroComprado: productos.filter((producto) => producto.id === 20),
    });
  },

  // controladores para generos
  policial: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 1
      }
    }).then(() =>
      res.render("./products/generos/policial", {
        title: "LEAF | Policial",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  romance: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 4
      }
    }).then(() =>
      res.render("./products/generos/romance", {
        title: "LEAF | Romance",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  misterio: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 5
      }
    }).then(() =>
      res.render("./products/generos/misterio", {
        title: "LEAF | Misterio",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  terror: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 7
      }
    }).then(() =>
      res.render("./products/generos/terror", {
        title: "LEAF | Terror",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  cienciaFiccion: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 3
      }
    }).then(() =>
      res.render("./products/generos/ciencia-ficcion", {
        title: "LEAF | Ciencia-ficcion",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  juvenil: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 6
      }
    }).then(() =>
      res.render("./products/generos/juvenil", {
        title: "LEAF | Juvenil",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  historica: (req, res) => {
    db.Genre.findOne({
      where: {
        id: 2
      }
    }).then(() =>
      res.render("./products/generos/historica", {
        title: "LEAF | Historica",
        productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
};
