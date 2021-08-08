const fs = require("fs");
const path = require("path");
const {productos,guardar} = require("../data/product_db");
const generos = require('../data/generos_db')

module.exports = {
  libros: (req, res) => {
    return res.render("./products/libros", {
      title: "LEAF | Libros",
      productos,
      papel: productos.filter((producto) => producto.formato === "Libro"),
      generos,
    });
  },
  ebooks: (req, res) => {
    return res.render("./products/ebooks", {
      title: "LEAF | E-books",
      productos,
      ebooks: productos.filter((producto) => producto.formato === "E-book"),
      generos,
    });
  },

  verMas: (req, res) => {
    return res.render("verMas", { title: "LEAF | Libros", productos },
    generos,);

  },

  detail: (req, res) => {
    return res.render("./products/productDetail", { title: "LEAF | Detalle" },
    generos,);
  },

  administrador: (req, res) => {
    return res.render("./products/admin", {
      title: "LEAF | Administrador",
      productos,
      generos,
    }); //Lista todos los productos
  },
  editarProducto: (req, res) => {
    return res.render("./products/editProduct", {
      title: "LEAF | Administrador",
    });
  },

  actualizarProducto: (req, res) => {
    const {titulo,id,isbn,stock,formato,categoria,autor,editorial,genero,precio,paginas,critica,portada,sinopsis} =req.body;

    let producto = productos.find(producto => producto.id === req.params.id)
    let productoEditado = {
      titulo :req.body.titulo,
      id: +req.params.id,
      isbn: req.body.isbn,
      stock : req.body.stock,
      formato: req.body.formato,
      categoria: req.body.categoria,
      autor: req.body.autor,
      editorial: req.body.editorial,
      genero: req.body.genero,
      precio: req.body.precio,
      paginas: req.body.paginas,
      critica: req.body.critica,
      portada: req.body.portada,
      sinopsis: req.body.sinopsis,
    }
    let productosModificados =productos.map(producto.id === +req.params.id ? productoEditado: producto)
    guardar(productosModificados)
    res.redirect('/')
  },
  agregarProducto: (req, res) => {
    return res.render("./products/addProduct", {
      title: "LEAF | Administrador",
      generos,
    });
  },

  carrito: (req, res) => {
    return res.render("./products/productCart", { title: "LEAF | Carrito" },
    generos,
    );
  },

  pago: (req, res) => {
    return res.render("./products/payForm", {
      title: "LEAF | Finaliza tu compra",
      generos,
    });
  },
  // controladores para generos
  policial :  (req, res) => {
    return res.render("./products/generos/policial", {
      title: "LEAF | Policial",
      productos,
      policial: productos.filter((producto) => producto.genero === "Policial"),
      generos,
    });
  },
  romance : (req,res) => {
    return res.render("./products/generos/romance",{
      title : "LEAF | Romance",
      productos,
      romance : productos.filter((producto) => producto.genero === 'Romance'),
      generos,
    });
  },
  misterio : (req,res) => {
    return res.render("./products/generos/misterio",{
      title : "LEAF | Misterio",
      productos,
      misterio : productos.filter((producto) => producto.genero === 'Misterio'),
      generos,
    });
  },
  terror : (req,res) => {
    return res.render("./products/generos/terror",{
      title : "LEAF | Terror",
      productos,
      terror : productos.filter((producto) => producto.genero === 'Terror'),
      generos,
    });
  },
  ficcion : (req,res) => {
    return res.render("./products/generos/ficcion",{
      title : "LEAF | Ficcion",
      productos,
      ficcion : productos.filter((producto) => producto.genero === 'Ficcion'),
      generos,
    });
  },
  cienciaFiccion : (req,res) => {
    return res.render("./products/generos/ciencia-ficcion",{
      title : "LEAF | Ciencia-ficcion",
      productos,
      cienciaFiccion : productos.filter((producto) => producto.genero === 'Ciencia ficcion'),
      generos,
    });
  },
  juvenil : (req,res) => {
    return res.render("./products/generos/juvenil",{
      title : "LEAF | Juvenil",
      productos,
      juvenil : productos.filter((producto) => producto.genero === 'Juvenil'),
      generos,
    });
  },
  historica : (req,res) => {
    return res.render("./products/generos/historica",{
      title : "LEAF | Historica",
      productos,
      historica : productos.filter((producto) => producto.genero === 'Historica'),
      generos,
    });
  },
  novela : (req,res) => {
    return res.render("./products/generos/novela",{
      title : "LEAF | Novela",
      productos,
      novela : productos.filter((producto) => producto.genero === 'Novela'),
      generos,
    });
  },

};
