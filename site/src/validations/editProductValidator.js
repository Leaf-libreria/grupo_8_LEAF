const { body, check } = require("express-validator");
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
  body("starId")
    .isInt({ min: 1, max: 5 })
    .withMessage("Número entre 1 y 5")
    .notEmpty()
    .withMessage("Campo obligatorio"),
  body("slogan")
    .notEmpty()
    .withMessage("Campo obligatorio")
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
  body("qrCode").custom((value, { req }) => {
    let qrCode = req.file;
    let allowedExtensions = [".jpg", ".jpeg", ".png"];
    if (qrCode) {
      let fileExtension = path.extname(qrCode.originalname);
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${allowedExtensions.join(", ")}`
        );
      }
    }
    return true;
  }),
  body("pdf").custom((value, { req }) => {
    let pdf = req.file;
    let allowedExtensions = [".pdf"];
    if (pdf) {
      let fileExtension = path.extname(pdf.originalname);
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          `Sólo se permite extensión ${allowedExtensions.join(", ")}`
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
