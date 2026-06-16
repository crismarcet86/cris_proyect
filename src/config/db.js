const { Sequelize } = require('sequelize');

['DB_NAME', 'DB_USER', 'DB_HOST'].forEach(key => {
    if (!process.env[key]) throw new Error(`Falta la variable de entorno: ${key}`);
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Para no llenar la consola de texto SQL
    }
);

module.exports = sequelize;