const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.BD_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('BD Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener app
    }
}

module.exports = conectarBD;