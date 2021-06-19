const express = require('express');
const app = express();
const path = require('path');
const port = 3010;

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/productCart', (req,res) => res.sendFile(path.join(__dirname, 'views', 'productCart.html')));
app.get('/productDetail', (req,res) => res.sendFile(path.join(__dirname, 'views', 'productDetail.html')));


app.listen(port, () => console.log( `server running in http://localhost:${port}` ));