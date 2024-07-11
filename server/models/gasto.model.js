const mongoose = require('mongoose');

const ingresoSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true }

});

const gastoSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true }

});

const alarmaSchema = new mongoose.Schema({
    tipo: { type: String, required: true },  // puede ser gasto o ingreso
    categoria: { type: String, required: true },
    cantidad: Number,
    mensaje: { type: String, required: true }
});

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    ingresos: { type: [ingresoSchema], required: true },
    gastos: { type: [gastoSchema], required: true },
    alarmas: { type: [alarmaSchema], required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;