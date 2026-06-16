const Usuario = require('../models/user.model');

const crearUsuario = async (req, res) => {
    try {
        
        const { nombre, email } = req.body;
        console.info(req)
        // Esto hace un INSERT INTO Usuarios en MySQL de forma automática
        const nuevoUsuario = await Usuario.create({ nombre, email });
        
        res.status(201).json({ ok: true, usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};


const actualizarUsuario = async (req, res) => {
    try {
        const { id, nombre, email } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        }

        if (nombre !== undefined) usuario.nombre = nombre;
        if (email !== undefined) usuario.email = email;
        await usuario.save();

        res.json({ ok: true, usuario });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

module.exports = { crearUsuario, actualizarUsuario };