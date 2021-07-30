module.exports = {
    verMas: (req,res) => {
        return res.render("verMas",
        {title: 'LEAF | Libros'})

    },

    detail: (req,res) => {
        return res.render("./products/productDetail",
        {title: 'LEAF | Detalle'})
    },

    administrador: (req,res) => {
        return res.render("./products/admin",
        {title: 'LEAF | Administrador'})
    },

    editarProducto: (req,res) => {
        return res.render("./products/editProduct",
        {title: 'LEAF | Administrador'})
    },
    agregarProducto: (req,res) => {
        return res.render("./products/addProduct",
        {title: 'LEAF | Administrador'})
    },


    carrito: (req,res) => {
        return res.render("./products/productCart",
        {title: 'LEAF | Carrito'})
    },

    pago: (req,res) => {
        return res.render("./products/payForm",
        {title: 'LEAF | Finaliza tu compra'})
    }
}