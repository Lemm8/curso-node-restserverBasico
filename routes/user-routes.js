const { Router } = require('express');
const { check } = require('express-validator');

const { rolValido,
        existeCorreo,
        existeIdUsuario } = require('../helpers/dbValidators')

const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, 
        postUsuarios,
        putUsuarios,
        patchUsuarios,
        deleteUsuarios } = require('../controllers/user-controller');

const router = Router();


// GET           CONTROLADOR
router.get( '/', getUsuarios );

// POST    MIDDLEWARES        CONTROLADOR
router.post( '/', [
        // VALIDACIONES DE CAMPOS OBLIGATORIOS
        check('nombre', 'El nombre es obligatorio').exists(),
        check('contrasena', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),        
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( existeCorreo ),
        check('rol').custom( rolValido ),
        // MOSTRAR ERRORES 
        validarCampos

],  postUsuarios );

// PUT              CONTROLADOR
router.put( '/:id', [
        // VALIDACIONES
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeIdUsuario ),
        check('rol').custom( rolValido ),
        // MOSTRAR ERRORES
        validarCampos
], putUsuarios );

// DELETE                 CONTROLADOR
router.delete( '/:id', [
        // VALIDACIONES
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeIdUsuario ),
        // MOSTRAR ERRORES
        validarCampos
] , deleteUsuarios );

// PATCH                CONTROLADOR
router.patch( '/:id',  patchUsuarios );


module.exports = router;