const { body} = require("express-validator");
const path = require("path");

module.exports = [
  body("title").notEmpty().withMessage("Campo obligatorio")
  .isLength({
      min: 2,
    })
    .withMessage("Debes ingresar al menos 2 caracteres"),
  body("isbn")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isInt()
    .withMessage("Ingrese solo números")
    .isISBN()
    .withMessage("ISBN inválido"),
  body("stock")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isInt()
    .withMessage("Ingrese solo números"),
  body("formatId").notEmpty().withMessage("Campo obligatorio"),
  body("categoryId").notEmpty().withMessage("Campo obligatorio"),
  body("authorId").notEmpty().withMessage("Campo obligatorio"),
  body("editorialId").notEmpty().withMessage("Campo obligatorio"),
  body("genreId").notEmpty().withMessage("Campo obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isInt()
    .withMessage("Ingrese solo números"),
  body("pages")
  
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isInt()
    .withMessage("Ingrese solo números"),

  body("slogan").notEmpty().withMessage("Campo obligatorio")
  .isLength({
      min: 5,
    })
        .withMessage("Debes ingresar al menos 5 caracteres"),
  body("cover").custom((value, { req }) => {
    let cover = req.file;
    let allowedExtensions = [".jpg",".jpeg", ".png", ".gif"];
    if (cover) {
      let fileExtension = path.extname(cover.originalname);
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${allowedExtensions.join(", ")}`
        );
      }
    }
    return true;
  }),
  body("synopsis").notEmpty().withMessage("Campo obligatorio")
  .isLength({
      min: 20,
    })
        .withMessage("Debes ingresar al menos 20 caracteres"),
];
