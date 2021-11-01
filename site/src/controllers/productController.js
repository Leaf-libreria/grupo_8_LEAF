const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
//Géneros, autores, editoriales ordenadas alfabéticamente para el header
const generos = db.Genre.findAll({ order: [['name', 'ASC']] });
const autores = db.Author.findAll({ order: [['nameLastname', 'ASC']] });
const editoriales = db.Editorial.findAll({ order: [['name', 'ASC']] });
const path = require("path");
const fs = require('fs');

module.exports = {
  // Vista por formato (libro o ebook)
  formatViews: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        { association: "formato" ,
      where:{
        name: req.params.name,
      }
    },
        { association: "genero" },
        { association: "autor" },
      ],
      where:{
        price: { [Op.gt]: 0 } //No muestra libros de precio cero
      }
    });
    generos;
    autores;
    editoriales;
    Promise.all([productos, generos, autores,editoriales])
      .then(([productos, generos, autores,editoriales]) =>{
      return  res.render("./products/commonViews/commonViews", {
          title: `LEAF | ${req.params.name.toUpperCase()}S`,
          productos,
          generos,
        autores, 
        editoriales,
        })
      })
      .catch((error) => console.log(error));
  },
//Vista por categorias (Más vendidos, recomendados,novedades)
  verMas: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        { association: "autor" },
        { association: "categoria",
      where: {
        name:req.params.name
      }
      },
        { association: "genero" },
        { association: "estrella" },
      ],
    });
    generos;
    autores; 
    editoriales;
    Promise.all([productos, generos, autores, editoriales])
      .then(([productos, generos, autores, editoriales]) => {
        return res.render("verMas", {
          title: `LEAF | ${req.params.name.toUpperCase()}`,
          productos,
          generos,
          autores, 
          editoriales,
        });
      })
      .catch((error) => console.log(error));
  },
//Vista detalle de libro
  detail: (req, res) => {
    let producto = db.Book.findOne({
      where: {
        id: req.params.id,
        price: { [Op.gt]: 0 } //Muestra libros con precios mayores a cero
      },

      include: [
        {
          association: "categoria",
        },
        {
          association: "editorial",
        },
        {
          association: "estrella",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });

    generos;
    autores; 
    editoriales;
    let relacionados = db.Book.findAll({
      include: [
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
      where:{
        price: {[Op.gt]:0} //No recomienda en el carrusel libros con precio cero
      }
    });
    Promise.all([producto, generos, autores, editoriales, relacionados])
      .then(([producto, generos, autores, editoriales,relacionados]) => {
        return res.render("./products/productDetail", {
          title: "LEAF | Detalle",
          producto,
          generos,
          autores, 
          editoriales,
          relacionados,
        });
      })
      .catch((error) => console.log(error));
  },
/*Vista panel de administración, Lista todos los productos, lleva a otros listados
y agregar, editar y eliminar productos*/
  administrador: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        {
          association: "categoria",
        },
        {
          association: "editorial",
        },
        {
          association: "estrella",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });
    generos;
    autores;
    editoriales;
    Promise.all([productos, generos, autores, editoriales,])
      .then(([productos, generos,autores, editoriales,]) => {
        return res.render("./products/admin", {
          title: "LEAF | Administrador",
          productos,
          generos,
          autores, 
          editoriales,
        }); //Lista todos los productos
      })
      .catch((error) => console.log(error));
  },
  //Vista formulario de edicion de producto
  editarProducto: (req, res) => {
    let errors = validationResult(req);
    generos;
    let productEdit = db.Book.findByPk(req.params.id, {
      include: [
        {
          association: "categoria",
        },
        {
          association: "editorial",
        },
        {
          association: "estrella",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });

    autores;
    editoriales;
    let estrellas = db.Star.findAll();
    let categorias = db.Category.findAll();
    let formatos = db.Format.findAll();

    Promise.all([
      generos,
      productEdit,
      autores,
      editoriales,
      estrellas,
      categorias,
      formatos,
    ])
      .then(
        ([
          generos,
          productEdit,
          autores,
          editoriales,
          estrellas,
          categorias,
          formatos,
        ]) => {
          return res.render("./products/editProduct", {
            title: "Editando",
            autores,
            generos,
            editoriales,
            estrellas,
            categorias,
            formatos,
            productEdit,
            errores: errors.mapped(),
          });
        }
      )
      .catch((error) => console.log(error));
  },
  //Método de edición de producto
  actualizarProducto: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let productEdit = db.Book.findByPk(req.params.id, {
        include: [
          {
            association: "categoria",
          },
          {
            association: "editorial",
          },
          {
            association: "estrella",
          },
          {
            association: "formato",
          },
          {
            association: "autor",
          },
          {
            association: "genero",
          },
        ],
      });

      db.Book.update(
        {
          title: req.body.title.trim(),
          price: req.body.price.trim(),
          synopsis: req.body.synopsis.trim(),
          slogan: req.body.slogan.trim(),
          isbn: req.body.isbn.trim(),
          pages: req.body.pages.trim(),
          stock: req.body.stock.trim(),
          authorId: req.body.authorId,
          genreId: req.body.genreId,
          formatId: req.body.formatId,
          categoryId: req.body.categoryId,
          editorialId: req.body.editorialId,
          starId: req.body.starId,
          cover: req.file ? req.file.filename : productEdit.cover,
          pdf: req.file ? req.file.filename : productEdit.pdf,
          qrCode: req.file ? req.file.filename : productEdit.qrCode,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

        .then(() => {
          return res.redirect("/products/administrador");
        })
        .catch((error) => console.log(error));
    } else {
      //si hay errores al enviar el formulario de edición de producto
      let productEdit = db.Book.findByPk(req.params.id, {
        include: [
          {
            association: "categoria",
          },
          {
            association: "editorial",
          },
          {
            association: "estrella",
          },
          {
            association: "formato",
          },
          {
            association: "autor",
          },
          {
            association: "genero",
          },
        ],
      });

      generos;
      autores;
      editoriales;
      let estrellas = db.Star.findAll();
      let categorias = db.Category.findAll();
      let formatos = db.Format.findAll();
      Promise.all([
        productEdit,
        generos,
        autores,
        editoriales,
        estrellas,
        categorias,
        formatos,
      ])
        .then(
          ([
            productEdit,
            generos,
            autores,
            editoriales,
            estrellas,
            categorias,
            formatos,
          ]) => {
            return res.render("./products/editProduct", {
              generos,
              errores: errors.mapped(),
              old: req.body,
              productEdit,
              title: "LEAF | Administrador",
              autores,
              editoriales,
              estrellas,
              categorias,
              formatos,
            });
          }
        )
        .catch((error) => console.log(error));
    }
  },
  //Vista formulario agregar producto
  addProducto: (req, res) => {
    let errors = validationResult(req);
    autores;
    generos;
    editoriales;
    let estrellas = db.Star.findAll();
    let categorias = db.Category.findAll();
    let formatos = db.Format.findAll();

    Promise.all([
      autores,
      generos,
      editoriales,
      estrellas,
      categorias,
      formatos,
    ])
      .then(
        ([autores, generos, editoriales, estrellas, categorias, formatos]) => {
          return res.render("./products/addProduct", {
            title: "LEAF | Administrador",
            errores: errors.mapped(),
            autores,
            generos,
            editoriales,
            estrellas,
            categorias,
            formatos,
          });
        }
      )
      .catch((error) => console.log(error));
  },
  //Método agregar producto
  agregarProducto: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Book.create({
        title: req.body.title.trim(),
        price: req.body.price.trim(),
        synopsis: req.body.synopsis.trim(),
        slogan: req.body.slogan.trim(),
        isbn: req.body.isbn.trim(),
        pages: req.body.pages.trim(),
        stock: req.body.stock.trim(),
        authorId: req.body.authorId.trim(),
        genreId: req.body.genreId.trim(),
        formatId: req.body.formatId.trim(),
        categoryId: req.body.categoryId.trim(),
        editorialId: req.body.editorialId.trim(),
        starId: req.body.starId.trim(),
        cover: req.file ? req.file.filename : "default-image-book.png",
      })
      .then(() => {
          return res.redirect("/products/administrador");
        })
        .catch((error) => console.log(error));
    } else {
      //Si hay errores al agregar producto
      req.file
      ? (file) =>
          fs
            .unlinkSync(path.join(__dirname, file))
            .deleteFile(`../public/images/${req.file.filename}`)
      : null;
      autores;
      generos;
      editoriales;
      let estrellas = db.Star.findAll();
      let categorias = db.Category.findAll();
      let formatos = db.Format.findAll();

      Promise.all([
        autores,
        generos,
        editoriales,
        estrellas,
        categorias,
        formatos,
      ])
        .then(
          ([
            autores,
            generos,
            editoriales,
            estrellas,
            categorias,
            formatos,
          ]) => {
            return res.render("./products/addProduct", {
              title: "LEAF | Administrador",
              autores,
              generos,
              editoriales,
              estrellas,
              categorias,
              formatos,
              errores: errors.mapped(),
              old: req.body,
            });
          }
        )
        .catch((error) => console.log(error));
    }
  },
  borrar: (req, res) => {
    db.Book.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect("/products/administrador"))
      .catch((error) => console.log(error));
  },

  //Agregar autor, editorial,genero, carrusel y publicidad
  //Vista agregar autor
  addAuthorGet: (req, res) => { 
    let errors = validationResult(req);
    autores;
    generos;
    editoriales;
    Promise.all([autores,generos, editoriales])
      .then(([autores,generos,editoriales]) => {
        return res.render("./products/addAuthor", {
          autores,
          generos,
          editoriales,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
  //método agregar autor
  addAuthorPost: (req, res) => { 
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Author.create({
        nameLastname: req.body.nameLastname.trim(),
      })
        .then(() =>{ return res.redirect("/products/listadoAutores")
      })
        .catch((error) => console.log(error));
    } else {
      let errors = validationResult(req);
      autores;
      generos;
      editoriales;
      Promise.all([autores,generos])
        .then(([autores,generos]) => {
          return res.render("./products/addAuthor", {
            autores,
            generos,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
  //Listado de autores
authorList:(req,res)=>{
  generos
  autores;
  editoriales;
  Promise.all([generos,autores,editoriales])
    .then(([generos,autores,editoriales])=>{
    return res.render('./products/authorList',{
      title: "LEAF | Administrador",
      autores,
      generos,
      editoriales,
    })
  })
  .catch(error => console.log(error));
},
//vista formulario editar autores
editAuthorGet:(req,res)=>{
  generos;
  autores; //Todos los autores (para el header)
  editoriales;
let autor=db.Author.findByPk(req.params.id) //El autor a editar
  Promise.all([generos, autores,editoriales,autor])
    .then(([generos,autores,editoriales,autor])=>{
    return res.render('./products/editAuthor',{
      title: "LEAF | Administrador",
      generos,
      autores,
      editoriales,
      autor,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
//Método editar autores
editAuthorPut:(req,res)=>{
    let errors = validationResult(req);
if(errors.isEmpty()){
  db.Author.update({
    nameLastname:req.body.nameLastname.trim()
  },
  {
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
              return res.redirect("/products/listadoAutores");

  }).catch(error => console.log(error));
}else{
  db.Author.findByPk(req.params.id)
.then((autor)=>{
  return res.render('./products/editAuthor',{
    autor,
    generos,
    autores,
    editoriales,
    errores:errors.mapped(),
    old:req.body,
    title:'LEAF | Administrador'
  })
})
}
},
deleteAuthor: (req, res) => {
    db.Author.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() =>{return res.redirect("/products/listadoAutores")})
      .catch((error) => console.log(error));
  },
//listado de géneros
  genreList:(req,res)=>{
    autores;
    editoriales;
    generos;
  Promise.all([generos,autores,editoriales])
    .then(([generos,autores,editoriales])=>{
    return res.render('./products/genreList',{
      generos,
      autores,
      editoriales,
      title: "LEAF | Administrador",
    })
  })
  .catch(error => console.log(error));
},
//Vista formulario agregar género
  addGenreGet: (req, res) => {
    let errors = validationResult(req);
    autores;
    editoriales;
    generos;
    Promise.all([generos, autores, editoriales])
      .then(([generos, autores, editoriales]) => {
        return res.render("./products/addGenre", {
          generos,
          autores,
          editoriales,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
  //método agregar género
  addGenrePost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Genre.create({
        name: req.body.name.trim(),
      })
        .then(() => {return res.redirect("/products/listadoGeneros")})
        .catch((error) => console.log(error));
    } else {
      let errors = validationResult(req);
      autores;
      editoriales;
      generos;
      Promise.all([generos, autores, editoriales])
        .then(([generos, autores, editoriales]) => {
          return res.render("./products/addGenre", {
            generos,
            autores,
            editoriales,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
//vista formulario editar genero
editGenreGet:(req,res)=>{
  autores;
  editoriales;
  generos;//todos los generos para el header
let genre=db.Genre.findByPk(req.params.id)//el genero a editar
  Promise.all([autores,editoriales,generos,genre])
  .then(([autores,editoriales,generos,genre])=>{
    return res.render('./products/editGenre',{
      title: "LEAF | Administrador",
      autores,
      editoriales,
      generos,
      genre,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
//método editar género
editGenrePut:(req,res)=>{
    let errors = validationResult(req);
if(errors.isEmpty()){
  db.Genre.update({
    name:req.body.name.trim()
  },
  {
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
              return res.redirect("/products/listadoGeneros");

  }).catch(error => console.log(error));
}else{
  autores,
  editoriales,
  generos
  let genre =db.Genre.findByPk(req.params.id)
  Promise.all([autores,editoriales,generos,genre])
.then(([autores,editoriales,generos,genre])=>{
  return res.render('./products/editGenre',{
    autores,
    editoriales,
    genre,
    generos,
    errores:errors.mapped(),
    old:req.body,
    title:'LEAF | Administrador'
  })
})
}
},
deleteGenre: (req, res) => {
    db.Genre.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {return res.redirect("/products/listadoGeneros")})
      .catch((error) => console.log(error));
  },
//Listado de editoriales
editorialList:(req,res)=>{
  generos;
  editoriales;
  autores;
  Promise.all([generos,editoriales,autores])
    .then(([generos,editoriales,autores])=>{
    return res.render('./products/editorialList',{
      title: "LEAF | Administrador",
      editoriales,
      generos,
      autores,
    })
  })
  .catch(error => console.log(error));
},
//Vista form. agregar editoriales
  addEditorialGet: (req, res) => {
    let errors = validationResult(req);
    generos;
    editoriales;
    autores;
    Promise.all([generos,editoriales, autores])
      .then(([generos,editoriales, autores]) => {
        return res.render("./products/addEditorial", {
          generos,
          editoriales,
          autores,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
  //método agregar editoriales
  addEditorialPost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Editorial.create({
        name: req.body.name.trim(),
      })
        .then(() => res.redirect("/products/listadoEditorial"))
        .catch((error) => console.log(error));
    } else {
      let errors = validationResult(req);
      generos;
      autores;
      editoriales;
      Promise.all([generos,autores,editoriales])
        .then(([generos,autores,editoriales]) => {
          return res.render("./products/addEditorial", {
            generos,
            editoriales,
            autores,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
  //Vista formularios editar editoriales
editEditorialGet:(req,res)=>{
  autores;
  editoriales;//Todas las editoriales para el header
  generos;
let editorial=db.Editorial.findByPk(req.params.id) //la editorial a editar
  Promise.all([autores,editoriales,generos,editorial])
  .then(([autores,editoriales,generos,editorial])=>{
    return res.render('./products/editEditorial',{
      title: "LEAF | Administrador",
      autores,
      editoriales,
      generos,
      editorial,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
//método editar editoriales
editEditorialPut:(req,res)=>{
    let errors = validationResult(req);
if(errors.isEmpty()){
  db.Editorial.update({
    name:req.body.name.trim()
  },
  {
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
              return res.redirect("/products/listadoEditorial");

  }).catch(error => console.log(error));
}else{
  generos;
  editoriales;
  autores;
  let editorial =db.Editorial.findByPk(req.params.id)
  Promise.all([generos,editoriales,autores,editorial])
.then(([generos,editorial])=>{
  return res.render('./products/editEditorial',{
    editoriales,
    autores,
    editorial,
    generos,
    errores:errors.mapped(),
    old:req.body,
    title:'LEAF | Administrador'
  })
})
}
},
deleteEditorial: (req, res) => {
    db.Editorial.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() =>{return res.redirect("/products/listadoEditorial")})
      .catch((error) => console.log(error));
  },

  // mostrar vista para agregar carrusel
  addCarouselGet: (req, res) => {
    let errors = validationResult(req);
  let primerImage = db.carouselImage.findOne({ 
      where: {
        id: 1,
      },
    });
    let imagesCarousel = db.carouselImage.findAll();
    generos;
    editoriales;
    autores;
    Promise.all([primerImage, imagesCarousel, generos, editoriales,autores])
    .then(
      ([primerImage, imagesCarousel, generos,editoriales,autores]) => {
        return res.render("./products/carrusel", {
          title: "Carrusel de imagenes",
          primerImage,
          imagesCarousel,
          generos,
          errors,
          editoriales,
          autores,
        });
      }
    );
  },
  // metodo carrusel post
  addCarouselPost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.carouselImage.create({
        name : req.file.filename,
      })
        .then(() => {return res.redirect("/products/administrador")})
        .catch((error) => console.log(error));
    } else {
      //metodo para borrar imagenes si hay error
      if (req.file) {
        let borrarImage = path.join( __dirname, "../../public/images/" + req.file.filename);
        fs.unlinkSync(borrarImage);
      }

      let errors = validationResult(req);
      let primerImage = db.carouselImage.findOne({
        where: {
          id: 1,
        },
      });
      let imagesCarousel = db.carouselImage.findAll();
      generos;
      editoriales;
      autores;
      Promise.all([primerImage, imagesCarousel, generos,editoriales,autores]).then(
        ([primerImage, imagesCarousel, generos,editoriales,autores]) => {
          return res.render("./products/carrusel", {
            title: "Carrusel de imagenes",
            primerImage,
            imagesCarousel,
            generos,
            editoriales,
            autores,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
  // metodo para editar imagenes del carrusel get
  editCarouselGet:(req,res) => {
    generos;
    editoriales;
    autores;
    let image= db.carouselImage.findByPk(req.params.id)
    Promise.all([generos,editoriales,autores, image])
      .then(([generos, editoriales, autores, image]) => {
      return res.render('./products/editarCarousel',{
        title: 'Editando carrusel',
        image,
        generos,
        editoriales,
        autores,
      })
    })
    .catch((error) => console.log(error));
  },
  // metodo para editar imagenes del carrusel put
  editCarouselUpdate:(req,res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
    db.carouselImage.update({
    name: req.file ? req.file.filename : req.body.image
    },{
      where: {
        id: req.params.id
      },
    }
    );
    let primerImage = db.carouselImage.findOne({
      where: {
        id: 1,
      },
    });
    let imagesCarousel = db.carouselImage.findAll();
    generos;
    editoriales;
    autores;
    Promise.all([primerImage, imagesCarousel, generos,editoriales,autores]).then(
      ([primerImage, imagesCarousel, generos,editoriales,autores]) => {
        return res.render("./products/carrusel", {
          title: "Carrusel de imagenes",
          primerImage,
          imagesCarousel,
          generos,
          editoriales,
          autores,
        });
      }
    );
  } else {
    //metodo para borrar imagenes si hay error
    if (req.file) {
      let borrarImage = path.join( __dirname, "../../public/images/" + req.file.filename);
      fs.unlinkSync(borrarImage);
    }
      db.carouselImage.findByPk(req.params.id)
      .then(image => {
        return res.render('./products/editarCarousel',{
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Editando carrusel",
        image,
      });
    });
  }
  },
  // borrar imagen de carrusel
deleteImageCarousel: (req, res) => {
    db.carouselImage.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {return res.redirect("/products/administrador")})
      .catch((error) => console.log(error));
  },
  /* sección de publicidad */
  addPromoGet: (req, res) => {
    let errors = validationResult(req);
      let primerPromo = db.Promo.findOne({
        where: {
      id: 1
    },
      });
      let imagesPromos = db.Promo.findAll();
      generos;
      autores;
      editoriales;
      Promise.all([primerPromo,imagesPromos,generos,autores,editoriales]).then(
        ([primerPromo,imagesPromos,generos,autores,editoriales]) => {
          return res.render("./products/promoList", {
            title: "Listado de publicidades",
            primerPromo,
            imagesPromos,
            generos,
            autores,
            editoriales,
            errors,
          });
        }
      )
  },
//método agregar promo
  addPromoPost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Promo.create({
        promoImage: req.file.filename,
      })
        .then(() =>{ return res.redirect("/products/administrador")})
        .catch((error) => console.log(error));
    } else {
         //metodo para borrar imagenes si hay error
    if (req.file) {
      let borrarImage = path.join( __dirname, "../../public/images/" + req.file.filename);
      fs.unlinkSync(borrarImage);
    }
      let errors = validationResult(req);
      let primerPromo = db.Promo.findOne({
        where: {
          id: 1,
        },
      });
      let imagesPromos = db.Promo.findAll();
      generos;
      autores;
      editoriales;
      Promise.all([primerPromo,imagesPromos,generos,autores,editoriales]).then(
        ([primerPromo,imagesPromos,generos,autores,editoriales]) => {
          return res.render("./products/promoList", {
            title: "Listado de publicidades",
            primerPromo,
            imagesPromos,
            generos,
            autores,
            editoriales,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        }
      )
        .catch((error) => console.log(error));
    }
  },
  //vista formulario edición promo
  editPromoGet:(req,res) =>{
    generos;
    editoriales;
    autores;
    let image = db.Promo.findByPk(req.params.id)
    Promise.all([generos,editoriales,autores, image])
      .then(([generos, editoriales, autores, image])=> {
      return res.render('./products/promoListEdit',{
        title: "Editando publicidad",
        image,
        generos,
        editoriales,
        autores,
      })
    })
    .catch(error => console.log(error))
  },
  //método edición promo
  editPromoPut:(req,res) =>{
    let errors = validationResult(req);

    if (errors.isEmpty()) {
    db.Promo.update({
      promoImage: req.file ? req.file.filename : req.body.image
    },{
      where: {
        id: req.params.id
      },
    }
    )
    
  .then(()=> {
    return res.redirect("/products/listadoPublicidad");
  })
  .catch((error) => {
    console.log(error);
  })
    
      
  } else {
       //metodo para borrar imagenes si hay error
      if (req.file) {
        let borrarImage = path.join( __dirname, "../../public/images/" + req.file.filename);
        fs.unlinkSync(borrarImage);
      }
      db.Promo.findByPk(req.params.id)
      .then(image => {
        return res.render('./products/promoListEdit',{
        errores: errors.mapped(),
        old: req.body,
        title: "LEAF | Editando publicidad",
        image,
      });
    });
  }
  },
  deletePromo:(req,res) =>{
    db.Promo.destroy({
      where:{
        id: req.params.id,
      },
    })
    .then(() => { return res.redirect("/products/listadoPublicidad")})
    .catch((error) => console.log(error))
  },

  carrito: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        {
          association: "categoria",
        },
        {
          association: "usuarios",
        },
        {
          association: "editorial",
        },
        {
          association: "estrella",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });
    generos;
    autores;
    editoriales;
    Promise.all([productos, generos, autores,editoriales]).then(([productos, generos,autores,editoriales]) => {
      return res.render("./products/productCart", {
        title: "LEAF | Carrito",
        productos,
        generos,
        autores,
        editoriales,
      });
    });
  },
  //vista formulario pago de compra
  pago: (req, res) => {
    let productos = db.Book.findOne({
      where: {
        id: 8,
      },
      include: [
        {
          association: "editorial",
        },
        {
          association: "formato",
        },
        {
          association: "autor",
        },
      ],
    });
    let usuarios = db.User.findAll({
      include: [{ association: "libros" }],
    });
    let costoEnvio = db.Provincia.findAll();

    generos;
    autores;
    editoriales;
    Promise.all([productos, usuarios, costoEnvio, generos,autores,editoriales]).then(
      ([productos, usuarios, costoEnvio, generos,autores,editoriales]) => {
        return res.render("./products/payForm", {
          title: "LEAF | Finaliza tu compra",
          productos,
          generos,
          autores,
          editoriales,
          usuarios,
          costoEnvio,
        });
      }
    );
  },

  pagoCard: (req, res) => {
    let errors = validationResult(req);
//Guardar la tarjeta en orden de compra
    if(errors.isEmpty()){
      Purchaseorder.create({
        titularCard: req.body.titularCard.trim(),
        cardNumber: req.body.cardNumber.trim(),
        dueDate: req.body.dueDate.trim(),
      })
    }
  },

  // controlador para vistas de libros por generos (sólo precio>0)
  genresViews: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        { association: "genero" ,
      where: {
        name: req.params.name
      }
    },
        {
          association: "autor",
        },
      ],
      where: {
        price: { [Op.gt]: 0 } //No muestra libros de precio cero
      }
    });
    generos;
    autores;
    editoriales;
    Promise.all([productos, generos,autores,editoriales])
      .then(([productos, generos,autores,editoriales]) => {
        return res.render("./products/commonViews/commonViews", {
          title: `LEAF | ${req.params.name.toUpperCase()}`,
          productos,
          generos,
          autores,
          editoriales,
        })
      })
      .catch((error) => console.log(error));
  },
//Crud métodos de pago
paymentMethodList:(req,res)=>{
  generos;
  autores,
  editoriales;
  let pagoMetodos=db.Paymentmethod.findAll()
  Promise.all([generos,autores,
    editoriales,pagoMetodos])
    .then(([generos,autores,
          editoriales,pagoMetodos])=>{
    return res.render('./products/paymentList',{
      title: "LEAF | Administrador",
      pagoMetodos,
      generos,
      autores,
      editoriales,
    })
  })
  .catch(error => console.log(error));
},
  addPaymentGet: (req, res) => {
    let errors = validationResult(req);
    generos;
    autores;
    editoriales;
    let pagoMetodo=db.Paymentmethod.findAll()
    Promise.all([generos, autores,editoriales, pagoMetodo])
      .then(([generos,autores,editoriales,pagoMetodo]) => {
        return res.render("./products/addPaymentMethod", {
          generos,
          autores,
          editoriales,
          pagoMetodo,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
  addPaymentPost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Paymentmethod.create({
        name: req.body.name.trim(),
      })
        .then(() =>{ return res.redirect("/products/listadoMetodosPago")})
        .catch((error) => console.log(error));
    } else {
      let errors = validationResult(req);
      generos;
      editoriales;
      autores;
      let pagoMetodo = db.Paymentmethod.findAll()
      Promise.all([generos,editoriales,autores, pagoMetodo])
        .then(([generos, editoriales, autores, pagoMetodo]) => {
          return res.render("./products/addPaymentMethod", {
            generos,
            editoriales,
            autores,
            pagoMetodo,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
editPaymentGet:(req,res)=>{
  generos;
  editoriales; 
  autores;
let pagoMetodo=db.Paymentmethod.findByPk(req.params.id)
  Promise.all([generos, editoriales, autores,pagoMetodo])
    .then(([generos, editoriales, autores,pagoMetodo])=>{
    return res.render('./products/editPaymentMethod',{
      title: "LEAF | Administrador",
      generos,
      editoriales, 
      autores,
      pagoMetodo,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
editPaymentPut:(req,res)=>{
    let errors = validationResult(req);
if(errors.isEmpty()){
  db.Paymentmethod.update({
    name:req.body.name.trim()
  },
  {
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
              return res.redirect("/products/listadoMetodosPago");

  }).catch(error => console.log(error));
}else{
  generos;
  editoriales;
  autores;
  let pagoMetodo=db.Paymentmethod.findByPk(req.params.id)
  Promise.all([generos, editoriales, autores, pagoMetodo])
.then(([generos,pagoMetodo])=>{
  return res.render('./products/editPaymentMethod',{
    pagoMetodo,
    generos,
    editoriales, 
    autores,
    errores:errors.mapped(),
    old:req.body,
    title:'LEAF | Administrador'
  })
})
}
},
deletePayment: (req, res) => {
    db.Paymentmethod.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {return res.redirect("/products/listadoMetodosPago")})
      .catch((error) => console.log(error));
  },
//Vista de libros por autor
  authorViews: (req,res)=>{
    generos;
    editoriales; 
    autores;
    let productos = db.Book.findAll({
      include: [
        { association: "genero" },
        {
          association: "autor",
          where: {nameLastname: req.params.nameLastname}
        },
      ],
      where: {
        price: { [Op.gt]: 0 }//Muestra si el precio es mayor a cero
      }
    });
    Promise.all([generos,editoriales, autores,productos])
      .then(([generos, editoriales, autores, productos]) => {
        return res.render('./products/commonViews/commonViews',{
    title: `LEAF | ${req.params.nameLastname.toUpperCase()}`, 
    generos,
    editoriales, 
    autores,
    productos,
    })
  }).catch(error => console.log(error));
  },
  //Vista de libros por editorial
  viewEditorials: (req,res)=>{
    generos;
    editoriales;
    autores;
    let productos = db.Book.findAll({
      include: [
        { association: "genero" },
        {
          association: "autor",
        },
        {association:"editorial",
          where: {name: req.params.name}
      }
      ],
      where:{
        price:{[Op.gt]:0}//Muestra si el precio es mayor a cero
      }
    });
    Promise.all([generos, editoriales, autores,productos])
      .then(([generos, editoriales, autores, productos]) => {
        return res.render('./products/commonViews/commonViews',{
    title: `LEAF | EDITORIAL ${req.params.name.toUpperCase()}`, 
    generos,
    editoriales, 
    autores,
    productos,
    })
  }).catch(error => console.log(error));
  },

  //vista para descargar libros (sólo libros precio=0)
  download: (req,res)=>{
    let productos= db.Book.findAll({
      include:[
        { association: "autor" },
        { association: "editorial" },
        { association: "genero" },
      ],
      where:{
        price: 0
      }
    })
    generos;
    editoriales;
    autores;
    Promise.all([productos, generos, editoriales, autores,])
    .then(([productos, generos,editoriales, autores,])=>{
    return res.render ('./products/freeBooks',{
      title: 'LEAF | LIBROS GRATIS',
      productos,
      generos,
      editoriales, 
      autores,
    })
  }).catch(error => console.log(error));
}
};
