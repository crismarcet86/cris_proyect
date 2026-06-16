const Usuario = require('../models/user.model');
const { analizarCambioUsuario } = require('../services/claude.service');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, username } = req.body;
        if (!nombre || !apellido || !email || !username) {
            return res.status(400).json({ ok: false, error: 'nombre, apellido, username y email son requeridos' });
        }
        const nuevoUsuario = await Usuario.create({ nombre, apellido, email, username });
        res.status(201).json({ ok: true, usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ ok: false, error: 'El email o username ya está registrado' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ ok: false, error: error.errors[0].message });
        }
        res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, username } = req.body;

        if (!nombre && !apellido && !email && !username) {
            return res.status(400).json({ ok: false, error: 'Debe enviar al menos un campo para actualizar' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        }

        const nombreAntiguo = usuario.nombre;

        if (nombre !== undefined) usuario.nombre = nombre;
        if (apellido !== undefined) usuario.apellido = apellido;
        if (email !== undefined) usuario.email = email;
        if (username !== undefined) usuario.username = username;
        await usuario.save();

        let analisis = null;
        try {
            analisis = await analizarCambioUsuario(nombreAntiguo, { nombre, apellido, email, username });
        } catch (claudeError) {
            console.error('Claude analysis failed (non-fatal):', claudeError);
        }

        res.json({ ok: true, usuario, analisis });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ ok: false, error: 'El email o username ya está registrado' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ ok: false, error: error.errors[0].message });
        }
        res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

module.exports = { crearUsuario, actualizarUsuario };
