
module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol === 2){
        next()
    }else{
        res.redirect('/')
    }
}