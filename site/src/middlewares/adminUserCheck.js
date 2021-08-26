
module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.category === "Administrador"){
        next()
    }else{
        res.redirect('/')
    }
}