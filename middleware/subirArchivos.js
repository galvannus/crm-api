const multer = require('multer');
const path = require('path');

//Configuración de guardado del archivo
let storage = multer.diskStorage({
    //Destino de guardado
    destination: path.join(__dirname, `../public/uploads`),
    //Nombre del archivo
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage,
    //Destino de guardado
    dest: path.join(__dirname, '../public/uploads')
});

module.exports = upload;