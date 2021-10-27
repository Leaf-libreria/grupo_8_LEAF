const db = require('../../database/models');

module.exports = {
    show: (req,res) => {
        try {
            let order = db.Purchaseorder.findOne({
                where : {
                    userId : req.session.userLogin.id,
                    status: 'pending'
                },
                include : [
                    {association : 'carts',
                include : [
                        {association : 'libro',
                        include: [ "categoria", "editorial",  "formato", "autor","genero"],
                         }
                        ]
                    }
                ]
            })
            if(order){
                order.carts.forEach(item => {
                    let product = {
                        id: item.bookId,
                        nombre : item.libro.name,
                        imagen : item.libro.image,
                        categoria : item.libro.categoria.name,
                        editorial: item.libro.editorial.name,
                        formato: item.libro.formao.name,
                        autor: item.libro.autor.name,
                        genero: item.libro.genero.name,
                        cantidad : item.quantity,
                        precio : item.libro.price,
                        total : item.libro.price * item.quantity,
                        orderId : order.id
                    }
                    req.session.cart.push(product)
                });
            }
            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }
}