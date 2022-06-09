
class Usuario:
    
    def __init__(self, username, clave, nombre, correo, rol):
        self.username = username
        self.clave = clave
        self.nombre = nombre
        self.correo = correo
        self.rol = rol

class Estudiante(Usuario):
    
    def __init__(self, username, clave, nombre, correo, rol, especialidad, carrera, centroEstudios, certificaciones, redSocial):
        
        Usuario.__init__(self, username, clave, nombre, correo, rol)
        
        self.especialidad = especialidad
        self.carrera = carrera
        self.centroEstudios = centroEstudios
        self.certificaciones = certificaciones
        self.redSocial = redSocial

class Administrador(Usuario):
    
    pass

class Scouter(Usuario):
    
    def __init__(self, username, clave, nombre, correo, rol, empresa, telefono):
        
        Usuario.__init__(self, username,clave, nombre, correo, rol)
        
        self.empresa = empresa
        self.telefono = telefono
        