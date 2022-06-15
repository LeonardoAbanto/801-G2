const express = require('express');  //express
const session = require('express-session') //para manejo de sesiones
const app = express();
const path = require('path');         
const port = 3000; //puerto
const bodyParser = require('body-parser')      //para formularios       

const {Oferta} = require("./models/Oferta.js")
const {Publicacion} = require("./models/Publicacion.js")
const {Usuario} = require("./models/Usuario.js")
const {crearUsuario, getUsuario} = require("./models/dao_usuarios.js")
const {getPublicaciones, crearPublicacion} = require("./models/dao_publicaciones.js")
const {getOfertas} = require("./models/dao_ofertas.js")


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
app.get('/', async (req, res) => {
    console.log(req.session.usuario)
    if(req.session.rol==null){
        res.redirect('/login')
    }else{
        publicaciones = await getPublicaciones()
        res.render('index', {
            rol: req.session.rol,
            usuario: req.session.usuario,
            publis: publicaciones
        })
    }
})

//publicar
app.post('/publicar', async (req, res) =>{
    console.log(req.body.texto)
    try{
        let publicacion = new Publicacion(null,req.body.texto,1,req.session.usuario.id_usuario)
        await crearPublicacion(publicacion)
        res.redirect('/')
    }catch (err){
        console.log(err)
    }
})

//pagina de ofertas
app.get('/ofertas', async (req, res) => {
    console.log(req.session.usuario)
    if(req.session.rol==null){
        res.redirect('/login')
    }else{
        ofertas = await getOfertas()
        res.render('ofertas', {
            rol: req.session.rol,
            usuario: req.session.usuario,
            publis: ofertas
        })
    }
})

//pagina login
app.get('/login', (req, res) => {
    if(req.session.rol==null){
        res.render('login', {
            rol: req.session.rol
        })
    }else{
        res.redirect('/')
    }
})
app.post('/login', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    try{
        let usuario = await getUsuario(username)
        console.log(usuario.nombres)
        if(usuario.contraseña==password){
            try{
                console.log("login exitoso")
                req.session.usuario = usuario
                req.session.rol=usuario.rol
                res.redirect('/')
            }catch (err){
                console.log("error desconocido")
                res.redirect('/')
            }        
        }else{
            console.log("contraseña o usuario incorrecto")
            res.redirect('/')
        }
    // }
    }catch (err){
        console.log("errorrrrrr")
    }
})

//pagina logout
app.get('/logout', (req, res) =>{
    if(req.session.rol==null){
        res.redirect('/login')
    }else{
        req.session.rol=null;
        req.session.usuario=null;
        res.redirect('/login')
    }
})


//pagina registro
app.get('/register', (req, res) => {
    if(req.session.rol==null){
        res.render('registro', {
            rol: req.session.rol
        })
    }else{
        res.redirect('/')
    }
})
app.post('/register', (req,res) => {
    if(req.body.password==req.body.passwordrepeat){
        try{
            usuarioNuevo = new Usuario(req.body.username,req.body.rol,req.body.name,req.body.surname,req.body.email,req.body.password)
            console.log(usuarioNuevo)
            crearUsuario(usuarioNuevo)
            res.redirect("/login")
        }catch (err){
            console.log("error desconocido")
            res.redirect("/register")
        }
    }else{
        console.log("las contraseñas no son iguales")
        res.redirect("/register")
    }
})



//iniciar servidor
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});