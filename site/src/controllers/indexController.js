module.exports = {
    index: (req,res) => {
        return res.render("index",
        {title: 'LEAF'})
    },

    preguntas: (req,res) =>{
        return res.render("preguntasFrecuentes",
        {title: 'LEAF | Preguntas frecuentes'})
    },

    quienesSomos: (req,res) =>{
        return res.render("quienesSomos",
        {title: 'LEAF | Quiénes somos'})
    }
}