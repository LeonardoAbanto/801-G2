var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

const {Usuario} = require("./Usuario.js")

const getUsuarios = async () => {
    var db = new sqlite3.Database('database.sqlite');
    db.serialize(function() {
      
        db.each('SELECT id AS id_usuario, nombres, apellidos, tipo as rol FROM Usuario', function(err, user) {
          console.log(user.id_usuario + ': ' + user.nombres+ ' '+ user.rol);
        });
      });
    db.close();
}

const queryUsuario = async(uID) => {

    let usuario;
    usuario = await new Promise(function (resolve,reject){
        var usuario;
        db.get("SELECT id AS id_usuario, nombres, apellidos, tipo as rol, correo, contraseña, especialidad FROM Usuario WHERE id=(?)", uID, async function (err, rows) {
            usuario = rows
            if (err){
                console.log("error")
                reject(new Error("error"));
            }else{
                resolve (usuario);
            }
    })})
    return usuario
}

async function getUsuario(uID){
    const usuario = await queryUsuario(uID)
    return usuario
}

const crearUsuario = async(usuario) => {
    var stmt = db.prepare('INSERT INTO Usuario(id, tipo, nombres, apellidos, correo, contraseña) VALUES (?,?,?,?,?,?)');
    stmt.run([usuario.id,usuario.tipo,usuario.nombres,usuario.apellidos,usuario.correo,usuario.contraseña])
}

module.exports = {crearUsuario, getUsuario, getUsuarios} 

