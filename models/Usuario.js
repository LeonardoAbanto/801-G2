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

module.exports = {Usuario}