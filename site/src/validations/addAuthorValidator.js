const {body}=require('express-validator');
module.exports=[
    body('nameLastname').notEmpty().withMessage('Campo obligatorio')
]