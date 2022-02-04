const { Schema, model } = require('mongoose');
const mongoosePaginate = require( 'mongoose-paginate' );

// TABLA USUARIO CON SUS CAMPOS
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    contrasena: {
        type: String,
        required: [ true, 'La contrasena es obligatoria' ],
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [ true, 'El rol es obligatorio' ],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }

});


UsuarioSchema.plugin( mongoosePaginate );


// RETORNAR USUARIO SIN CONTRASEÑA
UsuarioSchema.methods.toJSON = function() {
    // QUITAR CAMPOS A IGNORAR Y SACAR LOS DEMAS
    const { __v, contrasena , ...usuario } = this.toObject();
    return usuario;
}



module.exports = model( 'Usuario', UsuarioSchema );
