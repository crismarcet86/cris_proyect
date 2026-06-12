const { Router } = require('express');
const { crearUsuario } = require('../controllers/user.controller');

const router = Router();

// Cuando alguien entre a GET /usuarios, se dispara el controlador
router.get('/usuarios', crearUsuario);

module.exports = router;