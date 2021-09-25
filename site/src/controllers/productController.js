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

    let generos = db.Genre.findAll()
    let relacionados = db.Book.findAll({
    
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
    Promise.all([producto,generos, relacionados])
      .then(([producto,generos, relacionados]) => {
        return res.render("./products/productDetail", {
          title: 'LEAF | Detalle',
          producto,
          generos,
          relacionados 
        
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
      }).catch (error => console.log(error));
  },
  editarProducto: (req, res) => {
    let errors = validationResult(req);

    let generos = db.Genre.findAll()
    let productEdit = db.Book.findByPk(req.params.id,{

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

    Promise.all([generos, productEdit])
      .then(([generos, productEdit]) => {
        return res.render("./products/editProduct", {
          title: 'Editando ' + productEdit.title,
          generos,
          productEdit,//producto editado
          errores: errors.mapped(),

        });
      }).catch (error => console.log(error));
  },
  actualizarProducto: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let productEdit = db.Book.findByPk(req.params.id, {

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
      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, format, stock } = req.body;

      db.Book.update({
          title: title.trim(),
          author: author.trim(),
          price: price.trim(),
          categories: category,
          genre: genre.trim(),
          synopsis: synopsis.trim(),
          slogan: slogan.trim(),
          stars: stars.trim(),
          editorial: editorial.trim(),
          isbn: isbn.trim(),
          pages: pages.trim(),
          formats: format,
          stock: stock.trim(),
          cover: req.file? req.file.filename: productEdit.cover
        },
        {
          where: {
            id: req.params.id
          }
        })
      
      let productos = db.Book.findAll({
            include: [{ association: 'formato' },
        { association: 'genero' },
        { association: 'autor' }],
        where: {
          formatId: 1
        }
      })

        let generos = db.Genre.findAll()
    Promise.all([productEdit,productos, generos])
          .then(([productEdit, productos,generos]) => {
            return res.render('./products/admin', {
              title: "LEAF | Administrador",
        productEdit,generos, productos
      })
          }).catch(error => console.log(error));
    } else {
      let productEdit = db.Book.findByPk(req.params.id,{

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
    let generos = db.Genre.findAll()
    Promise.all([productEdit, generos])
      .then(([productEdit, generos]) => {
          return res.render('./products/editProduct', {
            generos,
            errores: errors.mapped(),
            old: req.body,
            productEdit, 
            title: 'LEAF | Administrador',
          });
      }).catch (error => console.log(error));

    }
  },
  addProducto: (req, res) => {
      db.Genre.findAll()
      .then(generos => {
        return res.render('./products/addProduct', {
          title: 'LEAF | Administrador', generos
        });
      }).catch(error => console.log(error))
  },
  agregarProducto: (req, res) => {
    let errors = validationResult(req);
    if (!errors) {
      db.Book.create({
        /* title: req.body.title.trim(),
        // author: req.body.author.trim(),
        // price: req.body.price.trim(),
        // categories: req.body.categories,
        // genre: req.body.genre.trim(),
        // synopsis: req.body.synopsis.trim(),
        // slogan: req.body.slogan.trim(),
        // stars: req.body.stars.trim(),
        // editorial: req.body.editorial.trim(),
        // isbn: req.body.isbn.trim(),
        // pages: req.body.pages.trim(),
        // formats: req.body.formats,
        // stock: req.body.stock.trim(),*/
        ...req.body,
        cover: req.file ? req.file.filename : 'default-image-book.png'
      })
      let productos = db.Book.findAll(/*{
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
        ]}*/)
     let generos= db.Genre.findAll()
      Promise.all([productos, generos])
        .then(([productos, generos]) => {
        return res.render('./products/admin',{
          generos, productos,
          title:"LEAF | Administrador",
        });
      }).catch(error => console.log(error))
    } else {
      db.Genre.findAll()
        .then(generos => {
          return res.render('./products/addProduct', {
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
