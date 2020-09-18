const mongoose = require('mongoose');

const ProspectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    primerApellido: {
        type: String,
        required: true,
        trim: true
    },
    segundoApellido: {
        type: String,
        trim: true
    },
    calle: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    estatus: {
        type: String,
        default: 'Enviado'
    },
    files: []
});
module.exports = mongoose.model('Prospecto', ProspectoSchema);