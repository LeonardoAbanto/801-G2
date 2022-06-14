const express = require('express');  //express
const session = require('express-session') //para manejo de sesiones
const app = express();
const path = require('path');         
const port = 3000; //puerto
const bodyParser = require('body-parser')      //para formularios       

const {Usuario} = require("./models/Usuario.js")
const {getUsuario, getUsuarios} = require("./models/dao_usuarios.js")

app.use(express.static(path.join(__dirname, 'assets'))) // configurar archivos estaticos
app.set('view engine', 'ejs') // configurar ejs template
app.set('views', path.join(__dirname, '/views'))  // configurar vistas
app.use(bodyParser.json()) // para trabajar con formularios 
app.use(bodyParser.urlencoded({
    extended: true
})) // para trabajar con formularios

app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
})) // configurando el manejo de sesiones para roles


//pagina principal
app.get('/', (req, res) => {
    console.log(req.session.rol)
    res.render('index', {
        rol: req.session.rol
    })
})

//pagina login
app.get('/login', (req, res) => {

    res.render('login', {
        rol: req.session.rol
    })
})
app.post('/login', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    try{
        let usuario = await getUsuario(username)
        console.log(usuario.nombres)
        if(usuario.contraseña==password){
            console.log("login exitoso")
            console.log(usuario)
            req.session.usuario = usuario
            req.session.rol=usuario.rol
            res.redirect('/')        
        }else{
            console.log("login fallido")
            res.redirect('/')
        }
    // }
    }catch (err){
        console.log("errorxdxdxd")
        res.redirect('/')
    }
    // if(usuario.contraseña==password){
    //     console.log("login exitoso")
    //     res.redirect('/')
    // }else{
    //     console.log(usuario.contraseña+' '+password)
    //     console.log("login fallido")
    //     res.redirect('/')
    //     console.log(usuario.contraseña)
    //     console.log(usuario.nombres)
    // }
    //continuar
})




//pagina registro
app.get('/register', (req, res) => {
    res.render('registro', {
        rol: req.session.rol
    })
})
app.post('/registro', async (req,res) => {
    usuarioNuevo = new Usuario(req.body.username,req.body.rol,req.body.name,req.body.surname,req.body.email,req.body.password)
})



//iniciar servidor
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});