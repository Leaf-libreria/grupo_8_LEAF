const fs = require('fs');
const path = require('path');

module.exports = {
    productos : JSON.parse(fs.readFileSync(path.join( __dirname,'products.json'),'utf-8')),
    guardar : data => fs.writeFileSync(path.join(__dirname, 'products.json'),JSON.stringify(data,null,2),'utf-8')
}