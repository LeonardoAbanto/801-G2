var sqlite3 = require('sqlite3').verbose();

const getUsuarios = async () => {
    var db = new sqlite3.Database('./database.sqlite');
    db.serialize(function() {
      
        db.each('SELECT id AS id_usuario, nombres, apellidos, tipo as rol FROM Usuario', function(err, user) {
          console.log(user.id_usuario + ': ' + user.nombres+ ' '+ user.rol);
        });
      });
    db.close();
}

const getUsuario = async (uID) => {
    var db = new sqlite3.Database('./database.sqlite');
    db.serialize(function() {
        db.each("SELECT id AS id_usuario, nombres, apellidos, tipo as rol FROM Usuario WHERE id= (?)",uID,function(err,user){
            console.log(user.nombres);
        });
    });
    db.close();
}

getUsuarios();
getUsuario("20180004");
getUsuario("20180235");