require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const usuarioRutas = require('./routes/user.routes');

// Importamos el modelo para que Sequelize sepa que existe y cree la tabla
const Usuario = require('./models/user.model'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usuarioRutas);

// Conectar a MySQL y encender el servidor
async function iniciarServidor() {
    try {
        // .sync() crea las tablas en MySQL si no existen
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('✅ Conexión a MySQL establecida con éxito.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
}

iniciarServidor();