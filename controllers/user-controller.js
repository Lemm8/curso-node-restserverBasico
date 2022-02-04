const { response, request } = require('express');
const Usuario = require('../models/usuario');

const { encriptarContrasena } = require('../helpers/encriptar')

// GET
const getUsuarios = (req = request, res = response) => {

    let page = 1;
    let itemsPerPage = 5;

    if ( req.query.page ) {
        page = Number( req.query.page );
    }

    if ( req.query.limit ) {
        itemsPerPage = Number( req.query.limit );
    }

    Usuario.paginate( { estado: true }, { page: page, limit: itemsPerPage, sort: '_id' }, ( err, usuarios ) => {
        if ( err ) return res.status( 500 ).send({
            status: 500,
            msg: 'Error en el servidor'
        });

        if ( !usuarios ) return res.status( 404 ).send({
            status: 500,
            msg: 'No se han encontrado usuarios en la búsqueda'
        })

        let data = {
            usuarios: usuarios.docs,
            totalUsuarios: usuarios.total,
            currentPage: usuarios.page,
            totalPages: usuarios.pages
        }

        res.status( 200 ).send({
            status: 200,
            data
        });

    });
}

// POST
const postUsuarios = async (req, res = response) => {

    // OBTENER CAMPOS OBLIGATORIOS
    const { nombre, correo, contrasena, rol } = req.body;
    // INSTANCIA DEL MODELO USUARIO MONGOOSE
    const usuario = new Usuario({ nombre, correo, contrasena, rol });    

    // ENCRIPTAR CONTRASEÑA 
    usuario.contrasena = encriptarContrasena( contrasena );


    // GUARDAR BD
    await usuario.save();

    res.json({
        msg: 'Usuario creado',
        usuario
    });
}


// PUT
const putUsuarios = async (req, res = response) => {

    const { id } = req.params;
    const { _id, contrasena, google, correo, ...info } = req.body;

    // TODO: VALIDAR CONTRA BASE DE DATOS
    if ( contrasena ) {
        info.contrasena = encriptarContrasena( contrasena );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, info, { new: true } );

    res.json({
        msg: 'Usuario actualizado', 
        usuario
    });
}


// PATCH
const patchUsuarios = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'patch API - Controlador',
        id
    });
}


// DELETE
const deleteUsuarios = async (req, res = response) => {

    const { id } = req.params;

    // BORRAR FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete( id );
    // res.json({
    //     usuario
    // });

    // BORRAR ( CAMBIAR ESTADO )
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    res.json({
        usuario
    })
    
}



module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    patchUsuarios,
    deleteUsuarios
}
