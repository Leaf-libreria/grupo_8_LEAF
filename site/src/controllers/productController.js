const fs = require("fs");
const path = require("path");
let { productos, guardar } = require("../data/product_db");
const costoEnvio = require("../data/envios-costo");
const {Genres, Books, Format, Category} = require('../database/models')
const { validationResult } = require('express-validator');

module.exports = {
  libros: (req, res) => {
    let libros = Books.findAll();
    let generos = Genres.findAll();
    let librosPapel = Format.findOne({
    where: {
      name : 'Libro'
    },
     include: [
       {association: 'books'}
     ]
    
   })
   Promise.all([libros, generos,  librosPapel])
   .then(([libros, generos, librosPapel]) => {
    return res.render("./products/libros", {
      title: "LEAF | Libros",
      libros,
      librosPapel,
      generos,
    });
   });

  },
  ebooks: (req, res) => {
    let libros = Books.findAll();
    let generos = Genres.findAll();
    let ebooks = Format.findOne({
    where: {
      name : 'E-book'
    },
     include: [
       {association: 'books'}
     ]
    
   })
   Promise.all([libros, generos,  ebooks])
   .then(([libros, generos, ebooks]) => {
    return res.render("./products/libros", {
      title: "LEAF | Ebooks",
      libros,
      ebooks,
      generos,
    });
   });
  },

  verMasVendidos: (req, res) => {
    let libros = Books.findAll();
    let generos = Genres.findAll();
    let masVendidos = Category.findOne({
    where: {
      name : "Mas vendidos"
    },
     include: [
       {association: 'books'}
     ]
    
   })
   Promise.all([libros, generos,  masVendidos])
   .then(([libros, generos, masVendidos]) => {
    return res.render("./products/verMasVendidos", {
      title: "LEAF | Mas vendidos",
      libros,
      masVendidos,
      generos,
    });
   });
  },

  verMasNovedades: (req, res) => {
    let libros = Books.findAll();
    let generos = Genres.findAll();
    let masNovedades = Category.findOne({
    where: {
      name : "Novedades"
    },
     include: [
       {association: 'books'}
     ]
    
   })
   Promise.all([libros, generos,  masNovedades])
   .then(([libros, generos, masNovedades]) => {
    return res.render("./products/vermasNovedades", {
      title: "LEAF | Novedades",
      libros,
      masNovedades,
      generos,
    });
   });
  },

  verMasRecomendados: (req, res) => {
    let libros = Books.findAll();
    let generos = Genres.findAll();
    let masRecomendados = Category.findOne({
    where: {
      name : "Recomendados"
    },
     include: [
       {association: 'books'}
     ]
    
   })
   Promise.all([libros, generos,  masRecomendados])
   .then(([libros, generos, masRecomendados]) => {
    return res.render("./products/vermasRecomendados", {
      title: "LEAF | Recomendados",
      libros,
      masRecomendados,
      generos,
    });
   });
  },

  detail: (req,res) => {
    let producto = productos.find(producto => producto.id === +req.params.id)

    let genero = producto.genero
    let idActual = producto.id
    let recomendados = productos.filter(producto => producto.genero === genero && producto.id != idActual).splice(0, 3)

    return res.render("./products/productDetail",{
        title: 'LEAF | Detalle',
        producto,
        recomendados,
        generos
})
},
  administrador: (req, res) => {
    return res.render("./products/admin", {
      title: "LEAF | Administrador",
      productos,
      generos,
    }); //Lista todos los productos
  },

  editarProducto: (req, res) => {
    
    let productEdit = productos.find(productEdit => productEdit.id === +req.params.id);
    return res.render("./products/editProduct", {
      title: 'Editando ' + productEdit.titulo,
      generos,
      productos,
      productEdit,//producto editado
    });
  },

  actualizarProducto: (req, res) => {
let productEdit = productos.find(
  (productEdit) => productEdit.id === +req.params.id
);
let errors = validationResult(req);
    if (errors.isEmpty()) {

      const { titulo, autor, precio, categoria, genero, sinopsis, slogan, estrellas, editorial, isbn, paginas, idioma, formato, stock } = req.body;
    

      let productoEditado = productos.find(producto => producto.id === +req.params.id);

      productoEditado.titulo = titulo.trim();
      productoEditado.autor = autor.trim();
      productoEditado.precio = +precio.trim();
      productoEditado.categoria = categoria;
      productoEditado.genero = genero.trim(),
      productoEditado.sinopsis = sinopsis.trim(),
      productoEditado.slogan = slogan.trim(),
      productoEditado.estrellas = +estrellas.trim(),
      productoEditado.editorial = editorial.trim(),
      productoEditado.isbn = +isbn.trim(),
      productoEditado.paginas = +paginas.trim(),
      productoEditado.idioma = idioma,
      productoEditado.formato = formato,
      productoEditado.stock = +stock.trim(),
      productoEditado.portada = req.file ? req.file.filename : productoEditado.portada
  
      let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

      guardar(productosModificados)
      return res.redirect('/products/administrador')
    } else {
      return res.render('./products/editProduct', {
        productos,
        generos,
        errores: errors.mapped(),
        old: req.body,
        productEdit,
        title: 'LEAF | Administrador',
      });
    }
  },
  addProducto: (req,res) =>{
    Genres.findAll()
    .then(function(generos){
      return res.render('./products/addProduct', {generos:generos})
    })
  },
  agregarProducto: (req, res) => {
let errors = validationResult(req);

    if (errors.isEmpty()) {
      Books.create({
        ...req.body
      })

      return res.redirect('/products/administrador');
    } else {
      if (req.file) {
        //Para no guardar la imagen si hay errores
        let deleteImage = path.join(
          __dirname,
          '../../public/images/' + req.file.filename
        );
        fs.unlinkSync(deleteImage);
      }
      let generos = Genres.findAll();
      let productos = Books.findAll();
      Promise.all([generos, productos])
      .then(([generos, productos]) =>{
          res.render('./products/addProduct', {
          productos,
          generos,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
     
    }
  },
  borrar: (req,res) => {
    productos = productos.filter(producto => producto.id !== +req.params.id);

    fs.writeFileSync(path.join( __dirname,'../data/products.json'),JSON.stringify(productos,null,2), "utf-8");
    return res.redirect("/products/administrador")
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
  policial: (req, res) => {
    return res.render("./products/generos/policial", {
      title: "LEAF | Policial",
      productos,
      policial: productos.filter((producto) => producto.genero === "Policial"),
      generos,
    });
  },
  romance: (req, res) => {
    return res.render("./products/generos/romance", {
      title: "LEAF | Romance",
      productos,
      romance: productos.filter((producto) => producto.genero === 'Romance'),
      generos,
    });
  },
  misterio: (req, res) => {
    return res.render("./products/generos/misterio", {
      title: "LEAF | Misterio",
      productos,
      misterio: productos.filter((producto) => producto.genero === 'Misterio'),
      generos,
    });
  },
  terror: (req, res) => {
    return res.render("./products/generos/terror", {
      title: "LEAF | Terror",
      productos,
      terror: productos.filter((producto) => producto.genero === 'Terror'),
      generos,
    });
  },
  ficcion: (req, res) => {
    return res.render("./products/generos/ficcion", {
      title: "LEAF | Ficcion",
      productos,
      ficcion: productos.filter((producto) => producto.genero === 'Ficcion'),
      generos,
    });
  },
  cienciaFiccion: (req, res) => {
    return res.render("./products/generos/ciencia-ficcion", {
      title: "LEAF | Ciencia-ficcion",
      productos,
      cienciaFiccion: productos.filter((producto) => producto.genero === 'Ciencia ficcion'),
      generos,
    });
  },
  juvenil: (req, res) => {
    return res.render("./products/generos/juvenil", {
      title: "LEAF | Juvenil",
      productos,
      juvenil: productos.filter((producto) => producto.genero === 'Juvenil'),
      generos,
    });
  },
  historica: (req, res) => {
    return res.render("./products/generos/historica", {
      title: "LEAF | Historica",
      productos,
      historica: productos.filter((producto) => producto.genero === 'Historica'),
      generos,
    });
  },
  novela: (req, res) => {
    return res.render("./products/generos/novela", {
      title: "LEAF | Novela",
      productos,
      novela: productos.filter((producto) => producto.genero === 'Novela'),
      generos,
    });
  },

};
