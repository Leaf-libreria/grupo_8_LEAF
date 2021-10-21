const db = require("../database/models");
const { validationResult } = require("express-validator");
const generos = db.Genre.findAll();
const path = require("path");
const fs = require('fs');

module.exports = {
  formatViews: (req, res) => {
    let productos = db.Book.findAll({
      include: [
        { association: "formato" ,
      where:{
        name: req.params.name
      }},
        { association: "genero" },
        { association: "autor" },
      ]
    });
    generos
    Promise.all([productos, generos])
      .then(([productos, generos]) =>{
      return  res.render("./products/commonViews/commonViews", {
          title: `LEAF | ${req.params.name.toUpperCase()}S`,
          productos,
          generos,
        })
      })
      .catch((error) => console.log(error));
  },

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
      ],
    });
    generos;
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
        return res.render("verMas", {
          title: `LEAF | ${req.params.name.toUpperCase()}`,
          productos,
          generos,
        });
      })
      .catch((error) => console.log(error));
  },

  detail: (req, res) => {
    let producto = db.Book.findOne({
      where: {
        id: req.params.id,
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

    generos
    let relacionados = db.Book.findAll({
      include: [
        {
          association: "autor",
        },
        {
          association: "genero",
        },
      ],
    });
    Promise.all([producto, generos, relacionados])
      .then(([producto, generos, relacionados]) => {
        return res.render("./products/productDetail", {
          title: "LEAF | Detalle",
          producto,
          generos,
          relacionados,          
        });
      })
      .catch((error) => console.log(error));
  },

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
    generos
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
        return res.render("./products/admin", {
          title: "LEAF | Administrador",
          productos,
          generos,
        }); //Lista todos los productos
      })
      .catch((error) => console.log(error));
  },
  editarProducto: (req, res) => {
    let errors = validationResult(req);
    generos

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

    let autores = db.Author.findAll();
    let editoriales = db.Editorial.findAll();
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
            title: "Editando " + productEdit.title,
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
      let autores = db.Author.findAll();
      let editoriales = db.Editorial.findAll();
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
  addProducto: (req, res) => {
    let errors = validationResult(req);
    let autores = db.Author.findAll();
    generos;
    let editoriales = db.Editorial.findAll();
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
      req.file
      ? (file) =>
          fs
            .unlinkSync(path.join(__dirname, file))
            .deleteFile(`../public/images/${req.file.filename}`)
      : null;
      let autores = db.Author.findAll();
      generos;
      let editoriales = db.Editorial.findAll();
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
  addAuthorGet: (req, res) => {  /* muestra la vista */
    let errors = validationResult(req);
    db.Author.findAll()
      .then((autor) => {
        return res.render("./products/addAuthor", {
          autor,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
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
      db.Author.findAll()
        .then(() => {
          return res.render("./products/addAuthor", {
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
authorList:(req,res)=>{
  generos
  let autores=db.Author.findAll()
  Promise.all([generos,autores])
    .then(([generos,autores])=>{
    return res.render('./products/authorList',{
      title: "LEAF | Administrador",
      autores,
      generos
    })
  })
  .catch(error => console.log(error));
},
editAuthorGet:(req,res)=>{
  generos
let autor=db.Author.findByPk(req.params.id)
  Promise.all([generos,autor])
  .then(([generos,autor])=>{
    return res.render('./products/editAuthor',{
      title: "LEAF | Administrador",
      generos,
      autor,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
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

  genreList:(req,res)=>{
  generos
    .then((generos)=>{
    return res.render('./products/genreList',{
      generos,
      title: "LEAF | Administrador",
    })
  })
  .catch(error => console.log(error));
},
  addGenreGet: (req, res) => {
    let errors = validationResult(req);
    generos
      .then((generos) => {
        return res.render("./products/addGenre", {
          generos,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
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
      generos
        .then((generos) => {
          return res.render("./products/addGenre", {
            generos,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },

editGenreGet:(req,res)=>{
  generos
let genre=db.Genre.findByPk(req.params.id)
  Promise.all([generos,genre])
  .then(([generos,genre])=>{
    return res.render('./products/editGenre',{
      title: "LEAF | Administrador",
      generos,
      genre,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
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
  generos
  let genre =db.Genre.findByPk(req.params.id)
  Promise.all([generos,genre])
.then(([generos,genre])=>{
  return res.render('./products/editGenre',{
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

editorialList:(req,res)=>{
  generos
  let editoriales=db.Editorial.findAll()
  Promise.all([generos,editoriales])
    .then(([generos,editoriales])=>{
    return res.render('./products/editorialList',{
      title: "LEAF | Administrador",
      editoriales,
      generos
    })
  })
  .catch(error => console.log(error));
},
  addEditorialGet: (req, res) => {
    let errors = validationResult(req);
    generos
    let editorial=db.Editorial.findAll()
    Promise.all([generos,editorial])
      .then(([generos,editorial]) => {
        return res.render("./products/addEditorial", {
          generos,
          editorial,
          errores: errors.mapped(),
          old: req.body,
          title: "LEAF | Administrador",
        });
      })
      .catch((error) => console.log(error));
  },
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
      generos
      let editorial=db.Editorial.findAll()
      Promise.all([generos,editorial])
        .then(([generos,editorial]) => {
          return res.render("./products/addEditorial", {
            generos,
            editorial,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        })
        .catch((error) => console.log(error));
    }
  },
editEditorialGet:(req,res)=>{
  generos
let editorial=db.Editorial.findByPk(req.params.id)
  Promise.all([generos,editorial])
  .then(([generos,editorial])=>{
    return res.render('./products/editEditorial',{
      title: "LEAF | Administrador",
      generos,
      editorial,
      old:req.body
    })
  })
  .catch(error => console.log(error));  
},
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
  generos
  let editorial =db.Editorial.findByPk(req.params.id)
  Promise.all([generos,editorial])
.then(([generos,editorial])=>{
  return res.render('./products/editEditorial',{
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
    Promise.all([primerImage, imagesCarousel, generos]).then(
      ([primerImage, imagesCarousel, generos]) => {
        return res.render("./products/carrusel", {
          title: "Carrusel de imagenes",
          primerImage,
          imagesCarousel,
          generos,
          errors
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
      Promise.all([primerImage, imagesCarousel, generos]).then(
        ([primerImage, imagesCarousel, generos]) => {
          return res.render("./products/carrusel", {
            title: "Carrusel de imagenes",
            primerImage,
            imagesCarousel,
            generos,
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
    db.carouselImage.findByPk(req.params.id)
    .then(image => {
      return res.render('./products/editarCarousel',{
        title: 'Editando carrusel',
        image
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
    Promise.all([primerImage, imagesCarousel, generos]).then(
      ([primerImage, imagesCarousel, generos]) => {
        return res.render("./products/carrusel", {
          title: "Carrusel de imagenes",
          primerImage,
          imagesCarousel,
          generos,
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
      Promise.all([primerPromo,imagesPromos,generos]).then(
        ([primerPromo,imagesPromos,generos]) => {
          return res.render("./products/promoList", {
            title: "Listado de publicidades",
            primerPromo,
            imagesPromos,
            generos,
            errors
          });
        }
      )
  },

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
      Promise.all([primerPromo,imagesPromos,generos]).then(
        ([primerPromo,imagesPromos,generos]) => {
          return res.render("./products/promoList", {
            title: "Listado de publicidades",
            primerPromo,
            imagesPromos,
            generos,
            errores: errors.mapped(),
            old: req.body,
            title: "LEAF | Administrador",
          });
        }
      )
        .catch((error) => console.log(error));
    }
  },
  editPromoGet:(req,res) =>{
    let image = db.Promo.findByPk(req.params.id)
    .then(image => {
      return res.render('./products/promoListEdit',{
        title: "Editando publicidad",
        image,
      })
    })
    .catch(error => console.log(error))
  },
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
          association: "cart",
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
    Promise.all([productos, generos]).then(([productos, generos]) => {
      return res.render("./products/productCart", {
        title: "LEAF | Carrito",
        productos,
        generos,
      });
    });
  },
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
    Promise.all([productos, usuarios, costoEnvio, generos]).then(
      ([productos, usuarios, costoEnvio, generos]) => {
        return res.render("./products/payForm", {
          title: "LEAF | Finaliza tu compra",
          productos,
          generos,
          usuarios,
          costoEnvio,
        });
      }
    );
  },

  pagoCard: (req, res) => {
    let errors = validationResult(req);

    if(errors.isEmpty()){
      Paymentmethod.create({
        titularCard: req.body.titularCard.trim(),
        cardNumber: req.body.cardNumber.trim(),
        dueDate: req.body.dueDate.trim(),
        securityCode: bcrypt.hashSync(req.body.securityCode, 10),
      })
    }
  },

  // controlador para generos
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
    });

    generos;
    Promise.all([productos, generos])
      .then(([productos, generos]) => {
        return res.render("./products/commonViews/commonViews", {
          title: `LEAF | ${req.params.name.toUpperCase()}`,
          productos,
          generos,
        })
      })
      .catch((error) => console.log(error));
  },
  
//Crud métodos de pago
paymentMethodList:(req,res)=>{
  generos
  let pagoMetodos=db.Paymentmethod.findAll()
  Promise.all([generos,pagoMetodos])
    .then(([generos,pagoMetodos])=>{
    return res.render('./products/paymentList',{
      title: "LEAF | Administrador",
      pagoMetodos,
      generos
    })
  })
  .catch(error => console.log(error));
},
  addPaymentGet: (req, res) => {
    let errors = validationResult(req);
    generos
    let pagoMetodo=db.Paymentmethod.findAll()
    Promise.all([generos, pagoMetodo])
      .then(([generos,pagoMetodo]) => {
        return res.render("./products/addPaymentMethod", {
          generos,
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
      generos
      let pagoMetodo = db.Paymentmethod.findAll()
      Promise.all([generos, pagoMetodo])
        .then(([generos, pagoMetodo]) => {
          return res.render("./products/addPaymentMethod", {
            generos,
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
  generos
let pagoMetodo=db.Paymentmethod.findByPk(req.params.id)
  Promise.all([generos,pagoMetodo])
  .then(([generos,pagoMetodo])=>{
    return res.render('./products/editPaymentMethod',{
      title: "LEAF | Administrador",
      generos,
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
  generos
  let pagoMetodo=db.Paymentmethod.findByPk(req.params.id)
  Promise.all([generos, pagoMetodo])
.then(([generos,pagoMetodo])=>{
  return res.render('./products/editPaymentMethod',{
    pagoMetodo,
    generos,
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

  authorViews: (req,res)=>{
    generos
    let productos = db.Book.findAll({
      include: [
        { association: "genero" },
        {
          association: "autor",
          where: {nameLastname: req.params.nameLastname}
        },
      ],
    });
    Promise.all([generos,productos])
      .then(([generos, productos]) => {
        return res.render('./products/commonViews/commonViews',{
    title: `LEAF | ${req.params.nameLastname.toUpperCase()}`, 
    generos,
    productos,
    })
  }).catch(error => console.log(error));
  },
  viewEditorials: (req,res)=>{
    generos
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
    });
    Promise.all([generos,productos])
      .then(([generos, productos]) => {
        return res.render('./products/commonViews/commonViews',{
    title: `LEAF | EDITORIAL ${req.params.name.toUpperCase()}`, 
    generos,
    productos,
    })
  }).catch(error => console.log(error));
  },
};
