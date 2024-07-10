const Usuario = require('../modelos/usuario.model');

// Obtener todos los usuarios
module.exports.findAllUsuarios = (req, res) => {
    Usuario.find()
        .then(allUsuarios => res.json({ usuarios: allUsuarios }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Obtener un usuario por ID
module.exports.findOneUsuario = (req, res) => {
    Usuario.findById(req.params.id)
        .then(oneUsuario => res.json({ usuario: oneUsuario }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Crear un nuevo usuario
module.exports.createUsuario = (req, res) => {
    Usuario.create(req.body)
        .then(newUsuario => res.json({ usuario: newUsuario }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Agregar un ingreso a un usuario
module.exports.addIngresoToUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const { tipo, cantidad, fecha, descripcion } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        const newIngreso = { tipo, cantidad, fecha, descripcion };
        usuario.ingresos.push(newIngreso);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
};

// Agregar un gasto a un usuario
module.exports.addGastoToUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const { tipo, cantidad, fecha, descripcion } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        const newGasto = { tipo, cantidad, fecha, descripcion };
        usuario.gastos.push(newGasto);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
};

// Configurar alarmas de un usuario
module.exports.addAlarmaToUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const { tipo, monto, mensaje } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        const newAlarma = { tipo, monto, mensaje };
        usuario.alarmas.push(newAlarma);

        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
};

// Obtener todos los ingresos de un usuario
module.exports.findAllIngresos = (req, res) => {
    Usuario.findById(req.params.id)
        .then(oneUsuario => res.json({ ingresos: oneUsuario.ingresos }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Obtener todos los gastos de un usuario
module.exports.findAllGastos = (req, res) => {
    Usuario.findById(req.params.id)
        .then(oneUsuario => res.json({ gastos: oneUsuario.gastos }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Eliminar un usuario
module.exports.deleteUsuario = (req, res) => {
    Usuario.deleteOne({ _id: req.params.id })
        .then(deletedUsuario => res.json({ usuario: deletedUsuario }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};