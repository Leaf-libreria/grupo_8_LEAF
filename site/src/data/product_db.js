const fs = require('fs');
const path = require('path');

module.exports = {
    productos : JSON.parse(fs.readFileSync(path.join( __dirname,'products.json'),'utf-8')),
    guardar : producto => fs.writeFileSync(path.join(__dirname, 'products.json'),JSON.stringify(producto,null,2),'utf-8')
}