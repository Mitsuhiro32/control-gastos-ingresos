const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/gasto.model');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = function (app) {
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const user = new Usuario({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            res.status(400).json({ message: 'Error al registrar usuario' });
        }
    });

    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await Usuario.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ message: 'Error al generar token' });
                }
                return res.status(200).json({ token });
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    });
};
