function estoyLogueado(req, res, next) {
    
    if (req.session.userLogin !== req.session.userLogin.id) {
    return res.redirect('/');
}
next();
}

module.exports = estoyLogueado;

