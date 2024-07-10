// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el middleware CORS
const gastoRoutes = require('./routes/gasto.routes');
const authRoutes = require('./routes/auth.routes'); // Importa las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use('/api/gastos', gastoRoutes);
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
