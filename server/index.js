require("dotenv").config();
const express = require("express");
const cors = require("cors");
const RutasGastos = require("./routes/gasto.routes");
const authRoutes = require('./routes/auth.routes');
const PORT = process.env.PORT || "8000";

const app = express();

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', authRoutes); // Rutas de autenticación
RutasGastos(app); // Rutas de gastos

app.listen(PORT, () => console.log(`El servidor está encendido en el puerto ${PORT}`));
