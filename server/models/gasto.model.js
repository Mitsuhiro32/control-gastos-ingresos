const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = { Usuario, Categoria };