const { Router } = require('express');
const { crearUsuario, actualizarUsuario } = require('../controllers/user.controller');

const router = Router();

router.post('/usuarios', crearUsuario);
router.patch('/usuarios/:id', actualizarUsuario);

module.exports = router;