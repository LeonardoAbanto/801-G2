var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

const {Oferta} = require("./Oferta.js")

const queryOfertas = async () => {

    ofertas = await new Promise(function(resolve,reject){
        db.all('SELECT id, fecha, nombre_empresa, texto, puesto, id_usuario FROM Oferta', function(err, rows){
        if (err){
            reject (err)
            return
        }
        resolve(rows)
    })
    })
    return ofertas
}

async function getOfertas() {
    ofertas = await queryOfertas()
    return ofertas
}

const crearOferta = async(oferta) => {
    var stmt = db.prepare('INSERT INTO Oferta (fecha, nombre_empresa, texto, puesto, id_usuario) VALUES (?,?,?,?,?)');
    stmt.run([oferta.fecha,oferta.nombre_empresa,oferta.texto,oferta.puesto,oferta.id_usuario])
}

module.exports = {getOfertas, crearOferta} 