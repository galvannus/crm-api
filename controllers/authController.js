const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Extraer email y password
    const { email, password} = req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe.'});
        }

        //Revisar password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto) {
            return res.status(400).json({ msg: 'Password incorrecto'});
        }

        //Si todo el correcto crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        
        //Firmar JWT
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            
            //Mensaje de confirmación
            res.json({ token });

        });
    } catch (error) {
        console.log(error);
    }
}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error'});
    }
}