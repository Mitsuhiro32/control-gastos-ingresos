const {Usuario, Categoria} = require('../models/gasto.model');

// Obtener las categorías de un usuario por ID
module.exports.findCategoriasByUsuarioIncludingPredefinidas = async (req, res) => {
    const usuarioId = req.infoUser.id;

    try {
        const usuario = await Usuario.findById(usuarioId);
        const categoriasPredefinidas = await Categoria.find(); // Obtener las categorías predefinidas

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const categoriasDelUsuario = usuario.categoriasPersonalizadas;
        const todasLasCategorias = [...categoriasPredefinidas, ...categoriasDelUsuario];

        res.json({ categorias: todasLasCategorias });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Agregar una categoría a un usuario
module.exports.addCategoriaToUsuario = async (req, res) => {
    const usuarioId = req.infoUser.id;
    const { nombre, tipo } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const newCategoria = { nombre, tipo };
        usuario.categoriasPersonalizadas.push(newCategoria);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Agregar un ingreso a un usuario
module.exports.addIngresoToUsuario = async (req, res) => {
    const usuarioId = req.infoUser.id;
    const { categoria, cantidad, fecha, descripcion } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const newIngreso = { categoria, cantidad, fecha, descripcion };
        usuario.ingresosPersonales.push(newIngreso);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Agregar un gasto a un usuario
module.exports.addGastoToUsuario = async (req, res) => {
    const usuarioId = req.infoUser.id;
    const { categoria, descripcion, cantidad, fecha } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const newGasto = { categoria, descripcion, cantidad, fecha };
        usuario.gastosPersonales.push(newGasto);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Configurar alarmas de un usuario
module.exports.addAlarmaToUsuario = async (req, res) => {
    const usuarioId = req.infoUser.id;
    const { tipo, categoria, monto, mensaje } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const newAlarma = { tipo, categoria, monto, mensaje };
        usuario.alarmas.push(newAlarma);

        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Obtener todos los ingresos de un usuario
module.exports.findAllIngresos = async (req, res) => {
    const usuarioId = req.infoUser.id;

    try {
        const usuario = await Usuario.findById(usuarioId);
        const ingresosPersonales = usuario.ingresosPersonales;
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ ingresos: ingresosPersonales });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Obtener todos los gastos de un usuario
module.exports.findAllGastos = async (req, res) => {
    const usuarioId = req.infoUser.id;

    try {
        const usuario = await Usuario.findById(usuarioId);
        const gastosPersonales = usuario.gastosPersonales;
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ gastos: gastosPersonales });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};

// Obtener todas las alarmas de un usuario
module.exports.findAllAlarmas = async (req, res) => {
    const usuarioId = req.infoUser.id;

    try {
        const usuario = await Usuario.findById(usuarioId);
        const alarmas = usuario.alarmas;
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ alarmas: alarmas });
    } catch (error) {
        res.json({ message: 'Ocurrió un error', error });
    }
};