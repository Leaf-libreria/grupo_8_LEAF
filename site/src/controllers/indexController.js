module.exports = {
    index: (req,res) => {
        return res.render("index")
    },

    preguntas: (req,res) =>{
        return res.render("preguntasFrecuentes")
    },

    quienesSomos: (req,res) =>{
        return res.render("quienesSomos")
    }
}