const express = require('express');
const cds = require('@sap/cds');
const cors = require('cors');
const router = express.Router();
const mongoose = require('./src/config/connectToMongoDB');
const dotenvXConfig = require('./src/config/dotenvXConfig');

module.exports = async (o) => {
    try {
        let app = express();
        app.express = express;

        app.use(express.json({ limit: '500kb' }));
        app.use(cors());

        app.use('/api', router);

        // Aquí importa el puerto de entorno o usa 3333 por defecto
        const port = process.env.PORT || 3333;

        o.app = app;
        o.app.httpServer = await cds.server(o);

        // Usamos listen aquí con el puerto dinámico
        o.app.httpServer.listen(port, () => {
            console.log(`API corriendo en puerto ${port}`);
        });

        return o.app.httpServer;

    } catch (error) {
        console.error('Error starting server', error);
        process.exit(1);
    }
};
