module.exports = {
    login: (req,res) => {
        return res.render("./users/login",
        {title: 'LEAF | Login'})
    },

    registro: (req,res) =>{
        return res.render("./users/register",
        {title: 'LEAF | Registro'})
    },

}