const express = require('express'); 
const app = express();
const path = require('path');             
const port = 3000;
const bodyParser = require('body-parser')                  

app.use(express.static(path.join(__dirname, 'assets'))) // configurar archivos estaticos
app.set('view engine', 'ejs') // configurar ejs template
app.set('views', path.join(__dirname, '/views')) 
app.use(bodyParser.json()) // para trabajar con formularios 
app.use(bodyParser.urlencoded({
    extended: true
})) // para trabajar con formularios

app.get('/', (req, res) => {
    res.render('index', {
    })
})

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});