const fs = require('fs');
const path = require('path');
const productos = require('../data/product_db');

module.exports = {
    libros: (req,res) => {
        return res.render("./products/libros",
        {title: 'LEAF | Libros',
        productos,
        papel : productos.filter(producto => producto.formato === "Libro"),})

    },

    verMas: (req,res) => {
        return res.render("verMas",{title: 'LEAF | Libros',
        productos})

    },

    detail: (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id)

        let genero = producto.genero
        let idActual = producto.id
        let recomendados = productos.filter(producto => producto.genero === genero && producto.id != idActual).splice(0,3)

    

        
        return res.render("./products/productDetail",{
            title: 'LEAF | Detalle',
            producto,
            recomendados,
    })
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