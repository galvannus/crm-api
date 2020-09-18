const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['promotor', 'administrador', 'evaluacion'],
        required: true
    }
});
module.exports = mongoose.model('Usuario', UsuariosSchema);