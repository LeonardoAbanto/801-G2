class Usuario{

    constructor(id, tipo, nombre, apellidos, correo, contraseña, especialidad) {

        this.id = id;
        this.tipo = tipo;
        this.nombres = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contraseña = contraseña;
        this.especialidad = especialidad;

    }

}


class Publicación{

    constructor(id, texto, fecha) {
        
        this.id = id;
        this.texto = texto;
        this.fecha = fecha;

    }

}

class Oferta{

    constructor(id, fecha, nombre_empresa, texto, puesto) {

        this.id = id;
        this.fecha = fecha;
        this.nombre_empresa = nombre_empresa;
        this.texto = texto;
        this.puesto = puesto;

    }

}

module.exports = {Usuario, Publicación, Oferta}