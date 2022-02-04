const Role = require('../models/rol')
const Usuario = require('../models/usuario');

// VERIFICAR SI EL ROL ES VÁLIDO
const rolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error( `El rol '${ rol }' no está registrado en la base de datos` );
    }
}


// VERIFICAR SI EL CORREO EXISTE
const existeCorreo = async( correo = '' ) => {
    const existeCorreo = await Usuario.findOne({ correo })
    if ( existeCorreo ) {
        throw new Error( `Ya hay una cuenta registrada con este correo: '${ correo }'` );
    }
};



// VERIFICAR SI EL ID EXISTE
const existeIdUsuario = async( id ) => {    
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error( `El id: '${ id }' no existe` );
    }
};




module.exports = {
    rolValido,
    existeCorreo,
    existeIdUsuario,
}