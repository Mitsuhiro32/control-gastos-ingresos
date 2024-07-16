const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true } // Puede ser ingreso o gasto
});

const ingresoSchema = new mongoose.Schema({
    categoria: { type: [categoriaSchema], required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true }

});

const gastoSchema = new mongoose.Schema({
    categoria: { type: [categoriaSchema], required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true }

});

const alarmaSchema = new mongoose.Schema({
    tipo: { type: String, required: true },  // puede ser gasto o ingreso
    categoria: { type: [categoriaSchema], required: true },
    cantidad: { type: Number, required: true },
    mensaje: { type: String, required: true }
});

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    categoriasPersonalizadas: { type: [categoriaSchema] },
    ingresos: { type: [ingresoSchema]},
    gastos: { type: [gastoSchema]},
    alarmas: { type: [alarmaSchema]}
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = { Usuario, Categoria };