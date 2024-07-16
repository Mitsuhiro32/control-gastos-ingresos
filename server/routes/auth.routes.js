const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/gasto.model');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new Usuario({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id , username: user.username}, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
