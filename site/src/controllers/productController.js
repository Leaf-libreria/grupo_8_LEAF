const fs = require("fs");
const path = require("path");
let { productos, guardar } = require("../data/product_db");
const costoEnvio = require("../data/envios-costo");
const generos = require('../data/generos_db');


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
    return res.render("verMas", { title: "LEAF | Libros", productos, generos },
     );

  },

  detail: (req, res) => {
    return res.render("./products/productDetail", { title: "LEAF | Detalle" },
      generos);
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

 const {titulo,autor,precio,categoria,genero,sinopsis,slogan,estrellas,editorial,isbn,paginas,idioma,formato} = req.body;
    
   let producto = productos.find(producto=> producto.id === +req.params.id);

   let productoEditado = {
     id : +req.params.id,
     titulo,
     autor,
     precio,
     categoria,
     genero,
     sinopsis,
     slogan,
     estrellas,
     editorial,
     isbn,
     paginas,
     idioma,
     formato,
     portada : req.file ? req.file.filename : producto.portada
   }
   let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

    console.log(productosModificados) 
    return res.redirect('/products/administrador')
  },
  addProducto: (req,res) =>{
    return res.render("./products/addProduct", {
      title: "LEAF | Administrador",
      generos,
    });
  },
  agregarProducto: (req, res) => {

    const {titulo,autor,precio,categoria,genero,sinopsis,slogan,estrellas,editorial,isbn,paginas,idioma,formato} = req.body;

    let product = {
      id : (productos[productos.length-1].id +1),
      titulo,
      autor,
      precio,
      categoria,
      genero,
      sinopsis,
      slogan,
      estrellas,
      editorial,
      isbn,
      paginas,
      idioma,
      formato,
      portada : req.file ? req.files.filename : 'default-image.png',
    }

    productos.push(product);
   guardar(productos)
    return res.redirect('/products/administrador',);

  },
  borrar: (req,res) => {
    productos = productos.filter(producto => producto.id !== +req.params.id);

    fs.writeFileSync(path.join( __dirname,'../data/products.json'),JSON.stringify(productos,null,2), "utf-8");
    return res.redirect("/products/administrador")
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
