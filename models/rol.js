const { Schema, model } = require('mongoose');

// TABLA ROL CON SUS CAMPOS
const RolSchema = Schema({

    rol: {
        type: String,
        required: [ true, 'El rol es obligatorio' ]
    },

});


module.exports = model( 'Role', RolSchema );
