const { response, request } = require('express');

// GET
const getUsuarios = (req = request, res = response) => {

    const { q, nombre = 'No Name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });
}

// POST
const postUsuarios = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API -Controlador',
        nombre, 
        edad
    });
}


// PUT
const putUsuarios = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador', 
        id
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
const deleteUsuarios = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'delete API - Controlador',
        id
    });
}



module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    patchUsuarios,
    deleteUsuarios
}
