const express = require('express');
const conectarBD = require('./config/db');
const cors = require('cors');
const path = require('path');

//Crear server
const app  = express();

//Contectar a BD
conectarBD();

//Habilitación cors
app.use(cors());

//Habilitación express.json
app.use( express.json({ extended: true }));

//Puerto del API
const PORT  = process.env.PORT || 4000;

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/prospectos', require('./routes/prospectos'));

//Client Routes
app.use(express.static(path.join(__dirname, 'client-crm/build')));
app.get('/nuevo-prospecto', function(req, res) {
    res.sendFile(path.join(__dirname, 'client-crm' ,'build', 'index.html'));
});
app.get('/listado-prospectos', function(req, res) {
    res.sendFile(path.join(__dirname, 'client-crm' ,'build', 'index.html'));
});

//Arrancar app
app.listen(PORT, () => {
    console.log(`El servidor funciona en el puerto ${PORT}`);
});