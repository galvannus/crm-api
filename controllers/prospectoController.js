const Prospecto = require('../models/Prospecto');
const { validationResult } = require('express-validator');


exports.crearProspecto = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        //Crear prospecto
        const prospecto = new Prospecto(req.body);

        //Guardar prospecto
        prospecto.save();
        res.json(prospecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener todos los prospectos
exports.obtenerProspectos = async (req, res) => {

    try {

        const prospectos = await Prospecto.find();
        res.json({ prospectos });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar prospecto
exports.actualizarProspecto = async (req, res) => {
    try {
        //Extraer prospecto y comprobar si existe
        const { estatus } = req.body;

        //Extraer prospecto
        let prospecto = await Prospecto.findById(req.params.id);

        if(!prospecto) {
            return res.status(404).json({ msg: 'Prospecto no encontrado'})
        }

        //Crear objeto con nueva información
        const nuevoProspecto = {};
        nuevoProspecto.estatus = estatus;
        

        //Guardar prospecto
        prospecto = await Prospecto.findOneAndUpdate({_id: req.params.id }, nuevoProspecto, {
            new: true
        });
        res.json({ prospecto });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}