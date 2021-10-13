const path = require("path");
const { body } = require("express-validator");
module.exports = [
  body("promos").custom((value, { req }) => {
    let image = req.file;
    let allowedExtensions = [".jpg", ".jpeg",".png", ".gif"];
    console.log(image);
    if (!image) {
      throw new Error(" Debes seleccionar una imagen");
    } else {
      let fileExtension = path.extname(image.originalname);

      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${allowedExtensions.join(", ")}`
        );
      }
    }
    return true;
  }),
];
