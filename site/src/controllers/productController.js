const fs = require("fs");
const path = require("path");
let { productos, guardar } = require("../data/product_db");
const costoEnvio = require("../data/envios-costo");
const generos = require('../data/generos_db');
const { validationResult } = require('express-validator');

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

  verMasVendidos: (req, res) => {
    return res.render("verMasVendidos", { title: "LEAF | Más vendidos", productos, generos, masVendidos : productos.filter(producto => producto.categoria === "Mas vendidos")},
  );
  },

  verMasNovedades: (req, res) => {
    return res.render("verMasNovedades", { title: "LEAF | Más novedades", productos, generos, masNovedades : productos.filter(producto => producto.categoria === "Novedades")},
    );
  },

  verMasRecomendados: (req, res) => {
    return res.render("verMasRecomendados", { title: "LEAF | Más recomendados", productos, generos, masRecomendados : productos.filter(producto => producto.categoria === "Recomendados")},
    );
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
    return res.render('./products/addProduct', {
      title: 'LEAF | Administrador',
      generos,
      productos,
    });
  },
  agregarProducto: (req, res) => {
let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, author, price, category, genre, synopsis, slogan, stars, editorial, isbn, pages, language, format, stock} = req.body;

      let product = {
        id: (productos[productos.length - 1].id + 1),
        title,
        author,
        price: +price,
        category,
        genre,
        synopsis,
        slogan,
        stars: +stars,
        editorial,
        isbn: +isbn,
        pages: +pages,
        language,
        format,
        stock: +stock,
        cover : req.file ? req.file.filename : 'default-image.png'
      }
      productos.push(product);
      guardar(productos)
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
      return res.render('./products/addProduct', {
        productos,
        genres,
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Administrador",
      });
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
