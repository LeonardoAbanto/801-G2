var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

const {Publicacion} = require("./Publicacion.js")

const queryPublicaciones = async() => {

    let publis;
    publis = await new Promise(function (resolve,reject){
        let publis = [];
        let i=0;
        db.all('SELECT id, texto, fecha, id_usuario FROM Publicacion', function(err, row) {
            publis[i]=row
            i+=1; 
        })
        console.log(i)
        console.log(publis)
        resolve(publis)
        })
}

async function test() {
    publis = await queryPublicaciones()
    console.log(publis+"xd")
}

test()