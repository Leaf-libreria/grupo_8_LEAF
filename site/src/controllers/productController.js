const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
  libros: (req, res) => {
    db.Format.findOne({
      where:{
        id: 1
      }
    }).then(()=>
    res.render("./products/libros", {
      title: "LEAF | Libros",
      // productos,
      // generos,/* Ver si necesita esos parametros */
    })).catch(error => console.log(error));    
  },
  ebooks: (req, res) => {
    db.Format.findOne({
      where: {
        id: 2
      }
    }).then(() =>
      res.render("./products/ebooks", {
        title: "LEAF | E-books",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  verMasVendidos: (req, res) => {
    db.Categorie.findOne({
      where: {
        id: 1
      }
    }).then(() =>
      res.render("verMasVendidos", { title: "LEAF | Más vendidos", productos, generos},/* Ver si necesita esos parametros */
      )).catch(error => console.log(error));
  },

  verMasNovedades: (req, res) => {
    db.Categorie.findOne({
      where: {
        id: 2
      }
    }).then(() =>
      res.render("verMasNovedades", { title: "LEAF | Más novedades", 
      /* productos, generos*/},
      )).catch(error => console.log(error));
  },

  verMasRecomendados: (req, res) => {
    db.Categorie.findOne({
      where: {
        id: 2
      }
    }).then(() =>
      res.render("verMasRecomendados", { title: "LEAF | Más recomendados", /*productos, generos*/ },
      )).catch(error => console.log(error));

  },

  detail: (req,res) => {
    let book=db.Book.findOne({
      where:{
        id:req.params.id
      },
      include: [
        { association: 'author' },
        { association: 'genre' },
        { association: 'format' },
        { association: 'category' },
        { association: 'editorial' },
        { association: 'star' },
      ]
    });
    let recomendados=db.Genre.findOne({
      where:{
        id: book.genreId
      },
      limit:3,
    });
    Promise.all([book,recomendados])
    .then(([book,recomendados])=>{
      return res.render("./products/productDetail", {
        title: 'LEAF | Detalle',
        book,
        recomendados,
        // generos /* Ver si los necesita*/
      })
    }).catch(error => console.log(error));
},
  administrador: (req, res) => {
  db.Book.findAll({
      include:[
        {association:'author'},
        {association:'genre'},
        {association:'format'},
        {association:'category'},
        {association:'editorial'},
        {association:'star'},
      ]
    })
    .then(book=>{
      return res.render("./products/admin", {
        title: "LEAF | Administrador",
        book,
        generos,/* ver si necesita generos */
      }); //Lista todos los productos
    })
  },

  editarProducto: (req, res) => {
    let genre= db.Genre.findAll();
    let productEdit = db.Book.findByPk(req.params.id);
    Promise.all([genre,productEdit])
    .then(([genre,productEdit])=>{
      return res.render("./products/editProduct", {
        title: 'Editando ' + productEdit.title,
        genre,
        productEdit,//producto editado
      });
    })    
  },

  actualizarProducto: (req, res) => {
let errors = validationResult(req);
    if (errors.isEmpty()) {

      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, language, format, stock } = req.body;

    db.Book.update(
      {
        title = title.trim(),
        author = author.trim(),
        price = price.trim(),
        category = category,
        genre = genre.trim(),
        synopsis = synopsis.trim(),
        slogan = slogan.trim(),
        stars = stars.trim(),
        editorial = editorial.trim(),
        isbn = isbn.trim(),
        pages= pages.trim(),
        language = language.trim,
        format = format,
        stock = stock.trim(),
        cover = req.file.filename
      },
      {where:{
        id: req.params.id
      }}
    ).then(() => res.redirect('/products/administrador')).catch(error => console.log(error));
    } else {
      db.Book.findAll()
      .then(book=>{
        return res.render('./products/editProduct', {
          book,
          generos,/* ver si necesita generos */
          errores: errors.mapped(),
          old: req.body,
          productEdit, /* ver si necesita productEdit */
          title: 'LEAF | Administrador',
        });
      })
      
    }
  },
  addProducto: (req,res) =>{
    db.Book.finadAll()
    .then(book=> {
      return res.render('./products/addProduct', {
        title: 'LEAF | Administrador',
        generos,/* ver si necesita generos */
        book,
      });
    }).catch(error=>console.log(error))
  },
  agregarProducto: (req, res) => {
let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, language, format, stock} = req.body;

      db.Book.create({
        title: title.trim(),
        author: author.trim(),
        price: price.trim(),
        category: category.trim(),
        genre:genre.trim(),
        synopsis: synopsis.trim(),
        slogan: slogan.trim(),
        stars: stars.trim(),
        editorial: editorial.trim(),
        isbn: isbn.trim(),
        pages: pages.trim(),
        language: language.trim(),
        format: format.trim(),
        stock: stock.trim(),
        cover: req.file.trim()
      }).then(book=>{
        return res.redirect('/products/administrador');
      }).catch(error=>console.log(error))
    } else {
      db.Book.findAll()
      .then(book=>{
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
  borrar: (req,res) => {
db.Book.destroy({
  where:{
    id:req.params.id
  }
}).then(() => res.redirect("/products/administrador"))
.catch(error => console.log(error));
},

  carrito: (req, res) => {
    return res.render("./products/productCart", { title: "LEAF | Carrito",  generos,},
    );
  },

  pago: (req, res) => {
    return res.render("./products/payForm", {
      title: "LEAF | Finaliza tu compra",
      productos,
      costoEnvio,
      libroComprado: productos.filter((producto) => producto.id === 20),
      generos,
    });
  },

  // controladores para generos
  policial:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 1
      }
    }).then(() =>
      res.render("./products/generos/policial", {
        title: "LEAF | Policial"
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  // policial: (req, res) => {
  //   return res.render("./products/generos/policial", {
  //     title: "LEAF | Policial",
  //     productos,
  //     policial: productos.filter((producto) => producto.genero === "Policial"),
  //     generos,
  //   });
  // },

  romance:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 4
      }
    }).then(() =>
      res.render("./products/generos/romance", {
        title: "LEAF | Romance",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  misterio:(req,res)=>{
  db.Genre.findOne({
    where: {
      id: 5
    }
  }).then(() =>
    res.render("./products/generos/misterio", {
      title: "LEAF | Misterio",
      // productos,
      // generos,/* Ver si necesita esos parametros */
    })).catch(error => console.log(error));
  },

  // misterio: (req, res) => {
  //   return res.render("./products/generos/misterio", {
  //     title: "LEAF | Misterio",
  //     productos,
  //     misterio: productos.filter((producto) => producto.genero === 'Misterio'),
  //     generos,
  //   });
  // },

  terror:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 7
      }
    }).then(() =>
      res.render("./products/generos/terror", {
        title: "LEAF | Terror",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },

  // terror: (req, res) => {
  //   return res.render("./products/generos/terror", {
  //     title: "LEAF | Terror",
  //     productos,
  //     terror: productos.filter((producto) => producto.genero === 'Terror'),
  //     generos,
  //   });
  // },

  cienciaFiccion:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 3
      }
    }).then(() =>
      res.render("./products/generos/ciencia-ficcion", {
        title: "LEAF | Ciencia-ficcion",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  // cienciaFiccion: (req, res) => {
  //   return res.render("./products/generos/ciencia-ficcion", {
  //     title: "LEAF | Ciencia-ficcion",
  //     productos,
  //     cienciaFiccion: productos.filter((producto) => producto.genero === 'Ciencia ficcion'),
  //     generos,
  //   });
  // },

  juvenil:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 6
      }
    }).then(() =>
      res.render("./products/generos/juvenil", {
        title: "LEAF | Juvenil",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  // 
  
  historica:(req,res)=>{
    db.Genre.findOne({
      where: {
        id: 2
      }
    }).then(() =>
      res.render("./products/generos/historica", {
        title: "LEAF | Historica",
        // productos,
        // generos,/* Ver si necesita esos parametros */
      })).catch(error => console.log(error));
  },
  // historica: (req, res) => {
  //   return res.render("./products/generos/historica", {
  //     title: "LEAF | Historica",
  //     productos,
  //     historica: productos.filter((producto) => producto.genero === 'Historica'),
  //     generos,
  //   });
  // },
};
