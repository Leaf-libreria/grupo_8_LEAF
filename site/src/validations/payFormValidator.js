const { body } = require("express-validator");

module.exports = [
/* guiarse por el value */
body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

body("lastname")
.notEmpty()
.withMessage("El apellido es obligatorio"),

body("number")
    .notEmpty()
    .isNumeric()
    .withMessage("Debe ingresar un número de teléfono"),

body("shipping")
.custom((value,{req}) => {
    if(value == req.body.retiroEbook){
        body("email")
        .notEmpty().withMessage("el email es obligatorio")
        .isEmail()
    } else if(value == req.body.retiroDomicilio);{
        body("street")
        .notEmpty().withMessage("Debe ingresar un domicilio")
    }
}),

body("paymentMethod")
.custom((value,{req}) => {
if(value == req.body.creditoDebito){
    body("titularCard")
    .notEmpty()
    .isLength({
        min: 2,
        max: 50
    })
    .withMessage("Debe ingresar el nombre del titular de la tarjeta"),
    body("cardType")
    .notEmpty()
    .withMessage("debe seleccionar una tarjeta"),
    body("cardNumber")
    .notEmpty()
    .isCreditCard()
    .isLength({
        min: 2,
        max: 50
    })
    .isNumeric(),
    body("dueDate")
    .notEmpty()
    .withMessage("Debe ingresar una fecha"),
    body("securityCode")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .isLength({
        min: 2,
        max: 50
    })
}
})
]