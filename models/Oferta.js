class Oferta{

    constructor(id, fecha, nombre_empresa, texto, puesto, id_usuario) {

        this.id = id;
        this.fecha = fecha;
        this.nombre_empresa = nombre_empresa;
        this.texto = texto;
        this.puesto = puesto;
        this.id_usuario = id_usuario;

    }

}

module.exports = {Oferta}