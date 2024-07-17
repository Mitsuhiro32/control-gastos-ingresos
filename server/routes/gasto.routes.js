const UsuarioController = require('../controller/gasto.controller');
const validarToken = require('../middleware/verificarToken');

module.exports = function (app) {
    // Rutas para ingresos
    app.post('/usuarios/ingresos', validarToken, UsuarioController.addIngresoToUsuario);
    app.get('/usuarios/ingresos', validarToken,  UsuarioController.findAllIngresos);

    // Rutas para gastos
    app.post('/usuarios/gastos', validarToken, UsuarioController.addGastoToUsuario);
    app.get('/usuarios/gastos', validarToken, UsuarioController.findAllGastos);

    // Rutas para categorías
    app.post('/usuarios/categorias', validarToken, UsuarioController.addCategoriaToUsuario);
    app.get('/usuarios/categorias', validarToken, UsuarioController.findCategoriasByUsuarioIncludingPredefinidas);

    // Rutas para alarmas
    app.post('/usuarios/alarmas', validarToken, UsuarioController.addAlarmaToUsuario);
    app.get('/usuarios/alarmas', validarToken, UsuarioController.findAllAlarmas);
}

