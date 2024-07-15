const mongoose = require("mongoose");
const {Categoria} = require('../models/gasto.model');
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gastos_db";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("¡Conexión a la base de datos exitosa!");
        inicializarCategoriasPredefinidas();
    })
    .catch((error) => console.log(`Hubo un error al conectar con la base de datos: ${error}`));

async function inicializarCategoriasPredefinidas() {
    try {
        const categorias = await Categoria.find();
        if (categorias.length === 0) {
            const categoriasPredefinidas = [
                { nombre: 'Alimentación', tipo: 'gasto' },
                { nombre: 'Transporte', tipo: 'gasto' },
                { nombre: 'Salud', tipo: 'gasto' },
                { nombre: 'Otros', tipo: 'gasto' },
                { nombre: 'Salario', tipo: 'ingreso' },
                { nombre: 'Ventas', tipo: 'ingreso' },
                { nombre: 'Ingresos Varios', tipo: 'ingreso' },
                { nombre: 'Otros', tipo: 'ingreso' }
            ];
            await Categoria.insertMany(categoriasPredefinidas);
            console.log('Categorías predefinidas inicializadas');
        } else {
            console.log('Las categorías predefinidas ya existen');
        }
    } catch (error) {
        console.log('Error al inicializar las categorías predefinidas:', error);
    }
}
