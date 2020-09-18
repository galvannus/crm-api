const express = require('express');
const router = express.Router();
const prospectoController = require('../controllers/prospectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

//Configuración de guardado del archivo
const storage = multer.diskStorage({
    //Destino de guardado
    destination: path.join(__dirname, `../public/uploads`),
    //Nombre del archivo
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    //Destino de guardado
    dest: path.join(__dirname, '../public/uploads')
});

//Crear prospectos
//api/prospectos
router.post('/',
    
    upload.array('selectedFile'),
    //TODO: Descomentar validación de autenticación
    //auth,
    prospectoController.crearProspecto
)
router.get('/',
    //TODO: Descomentar validación de autenticación
    //auth,
    prospectoController.obtenerProspectos
)

//Actualizar prospecto
router.put('/:id',
    prospectoController.actualizarProspecto
);



module.exports = router;