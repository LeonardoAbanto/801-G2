var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

const {Publicacion} = require("./Publicacion.js")

const queryPublicaciones = async () => {

    publis = await new Promise(function(resolve,reject){
        db.all('SELECT id, texto, fecha, id_usuario FROM Publicacion', function(err, rows){
        if (err){
            reject (err)
            return
        }
        resolve(rows)
    })
    })
    return publis
}

async function getPublicaciones() {
    publis = await queryPublicaciones()
    
    return publis
}

const crearPublicacion = async(publicacion) => {
    var stmt = db.prepare('INSERT INTO Publicacion (texto, fecha, id_usuario) VALUES (?,?,?)');
    stmt.run([publicacion.texto,publicacion.fecha,publicacion.id_usuario])
}

module.exports = {getPublicaciones, crearPublicacion} 