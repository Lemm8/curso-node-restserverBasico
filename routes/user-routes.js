const { Router } = require('express');

const { getUsuarios, 
        postUsuarios,
        putUsuarios,
        patchUsuarios,
        deleteUsuarios } = require('../controllers/user-controller');

const router = Router();


// GET           CONTROLADOR
router.get( '/', getUsuarios );

// POST            CONTROLADOR
router.post( '/',  postUsuarios );

// PUT              CONTROLADOR
router.put( '/:id', putUsuarios );

// DELETE                 CONTROLADOR
router.delete( '/:id',  deleteUsuarios );

// PATCH                CONTROLADOR
router.patch( '/:id',  patchUsuarios );


module.exports = router;