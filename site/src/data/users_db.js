 const fs = require('fs');
 const path = require('path');

 module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),'utf-8'));
 module.exports = {
    guardar : usuario => fs.writeFileSync(path.join(__dirname, 'users.json'),JSON.stringify(usuario,null,2),'utf-8')
 }

 /* const guardar = fs.writeFileSync(usersFilePath,JSON.stringify(users, null, 2),"utf-8");

 module.exports = guardar; */