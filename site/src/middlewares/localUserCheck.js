module.exports = (req,res,next) => {
    if(req.session.userLogin){
        res.locals.userLogin = req.session.userLogin
    }
    next()
}

// module.exports = (req,res,next) => {
//     res.locals.isLogged = false
//     if(req.cookies.user){
//         res.locals.isLogged= true;
//         req.session.userLogin = req.cookies.user;
//     }else if (req.session.userLogin) {
//         res.locals.isLogged= true;
//         res.locals.userLogin = req.session.userLogin
//     }
//     next()
// }

