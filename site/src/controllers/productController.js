module.exports = {
    verMas: (req,res) => {
        return res.render("verMas")

    },

    detail: (req,res) => {
        return res.render("./products/productDetail")
    },

    administrador: (req,res) => {
        return res.render("./products/admin")
    },

    carrito: (req,res) => {
        return res.render("./products/productCart")
    },

    pago: (req,res) => {
        return res.render("./products/payForm")
    }
}