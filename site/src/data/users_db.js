 const fs = require('fs');
 const path = require('path');

 module.exports = {
    users : JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),'utf-8')),
    guardar : usuario => fs.writeFileSync(path.join(__dirname, 'users.json'),JSON.stringify(usuario,null,2),'utf-8')
 }
