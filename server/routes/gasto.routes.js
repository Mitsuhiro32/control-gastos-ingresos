// server/routes/gasto.routes.js
const express = require('express');
const router = express.Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
    res.send('Lista de gastos');
});

router.post('/', (req, res) => {
    res.send('Crear un gasto');
});

module.exports = router;
