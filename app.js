const express = require('express');  //express
const session = require('express-session') //para manejo de sesiones
const app = express();
const path = require('path');         
const port = 3000; //puerto
const bodyParser = require('body-parser')      //para formularios       

const {Oferta} = require("./models/Oferta.js")
const {Publicacion} = require("./models/Publicacion.js")
const {Usuario} = require("./models/Usuario.js")
const {crearUsuario, getUsuario, editarCV, editarRedes, editarEspecialidad} = require("./models/dao_usuarios.js")
const {getPublicaciones, crearPublicacion} = require("./models/dao_publicaciones.js")
const {getOfertas, crearOferta} = require("./models/dao_ofertas.js")


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
        let publicacion = new Publicacion(null,req.body.texto,"15/06/2022",req.session.usuario.id_usuario)
        await crearPublicacion(publicacion)
        res.redirect('/')
    }catch (err){
        console.log(err)
    }
})

//subiroferta
app.post('/subiroferta', async (req, res) =>{
    console.log(req.body.texto)
    try{
        let oferta = new Oferta(null,"10/07/2022",req.body.nombre_empresa,req.body.texto,req.body.puesto,req.session.usuario.id_usuario)
        await crearOferta(oferta)
        res.redirect('/')
    }catch (err){
        console.log(err)
    }
})

//subir/editar cv
app.post('/editarcv', async (req, res) =>{
    try{
        await editarCV(req.session.usuario.id_usuario,req.body.cv)
        req.session.usuario = await getUsuario(req.session.usuario.id_usuario)
        res.redirect('/miperfil')
    }catch (err){
        console.log(err)
    }
})

//subir/editar especialidad
app.post('/editarespecialidad', async (req, res) =>{
    try{
        await editarEspecialidad(req.session.usuario.id_usuario,req.body.especialidad)
        req.session.usuario = await getUsuario(req.session.usuario.id_usuario)
        res.redirect('/miperfil')
    }catch (err){
        console.log(err)
    }
})

//subir/editar redes
app.post('/editarredes', async (req, res) =>{
    try{
        await editarRedes(req.session.usuario.id_usuario,req.body.redes)
        req.session.usuario = await getUsuario(req.session.usuario.id_usuario)
        res.redirect('/miperfil')
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

//pagina editar perfil
app.get('/miperfil', async (req,res) => {
    if(req.session.rol!="Estudiante"){
        res.redirect('/')
    }else{
        res.render('miperfil', {
            rol: req.session.rol,
            usuario: req.session.usuario,
        })
    }
})

//pagina subir oferta
app.get('/subiroferta', async (req,res) => {
    if(req.session.rol!="Empleador"){
        res.redirect('/')
    }else{
        res.render('subiroferta', {
            rol: req.session.rol,
            usuario: req.session.usuario,
        })
    }
})

//pagina de perfil
app.get('/perfil/:id', async (req,res) =>{
    const uID = req.params.id;
    const usuarioPer = await getUsuario(uID);
    if(req.session.rol==null){
        res.redirect('/')
    }else{
        res.render('perfil', {
            rol: req.session.rol,
            usuario: req.session.usuario,
            usuarioPerfil: usuarioPer,
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

//falta adaptar css

//pagina prospectos
app.get('/prospectos', async (req,res) =>{
    res.render('prospectos',{
        rol: req.session.rol
    })
})

//pagina aplicar
app.get('/aplicar', async (req,res) =>{
    res.render('aplicar',{
        rol: req.session.rol
    })
})



//iniciar servidor
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});