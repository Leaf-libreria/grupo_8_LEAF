const { check, body } = require("express-validator");
const path = require("path");
module.exports = [

  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("El nombre tiene que tener como mínimo 2 caracteres"),
    body("image").custom((value, { req }) => {
      let image = req.file;
      let allowedExtensions = [".jpg", ".jpeg",".png", ".gif"];
      console.log(image);
      if (image) {
    
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
