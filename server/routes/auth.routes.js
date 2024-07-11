// server/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de tener el modelo de usuario

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validar y crear el usuario en la base de datos
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    // Implementa la lógica para iniciar sesión aquí
});

module.exports = router;




