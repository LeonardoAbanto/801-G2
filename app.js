const express = require('express');  //express
const app = express();
const path = require('path');         
const port = 3000; //puerto
const bodyParser = require('body-parser')      //para formularios            

app.use(express.static(path.join(__dirname, 'assets'))) // configurar archivos estaticos
app.set('view engine', 'ejs') // configurar ejs template
app.set('views', path.join(__dirname, '/views'))  // configurar vistas
app.use(bodyParser.json()) // para trabajar con formularios 
app.use(bodyParser.urlencoded({
    extended: true
})) // para trabajar con formularios

//pagina principal
app.get('/', (req, res) => {
    res.render('index', {
    })
})

//pagina login
app.get('/login', (req, res) => {
    res.render('login', {
    })
})

//pagina registro
app.get('/register', (req, res) => {
    res.render('registro', {
    })
})

//iniciar servidor
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});