const { Router } = require('express');
const { crearUsuario, actualizarUsuario } = require('../controllers/user.controller');

const router = Router();

// Cuando alguien entre a GET /usuarios, se dispara el controlador
router.get('/usuarios', crearUsuario);

router.patch('/usuarios', actualizarUsuario);

module.exports = router;