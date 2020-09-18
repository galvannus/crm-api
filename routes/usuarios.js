const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check, oneOf } = require('express-validator');
//TODO: Quitar el metodo post para evitar registros
//Crear usuario
//api/usuarios
router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6}),
        check('role', 'El usuario necesita un rol valido').not().isEmpty(),
        oneOf([
            check('role', 'Rol de usuario no valido').isIn(['promotor', 'administrador', 'evaluacion'])
        ])
        /*.withMessage('Rol de usuario no valido').isIn(['promotor', 'administrador', 'evaluacion']),*/
    ],
    usuarioController.crearUsuario
);
module.exports = router;