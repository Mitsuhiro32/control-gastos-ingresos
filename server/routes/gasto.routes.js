const UsuarioController = require('../controller/gasto.controller');

module.exports = function (app) {
    // Rutas para usuarios
    app.get('/usuarios', UsuarioController.findAllUsuarios);
    app.get('/usuarios/:id', UsuarioController.findOneUsuario);
    app.post('/usuarios', UsuarioController.createUsuario);
    app.delete('/usuarios/:id', UsuarioController.deleteUsuario);

    // Rutas para ingresos
    app.post('/usuarios/:id/ingresos', UsuarioController.addIngresoToUsuario);
    app.get('/usuarios/:id/ingresos', UsuarioController.findAllIngresos);

    // Rutas para gastos
    app.post('/usuarios/:id/gastos', UsuarioController.addGastoToUsuario);
    app.get('/usuarios/:id/gastos', UsuarioController.findAllGastos);

    // Rutas para categorías
    app.post('/usuarios/:id/categorias', UsuarioController.addCategoriaToUsuario);
    app.get('/usuarios/:id/categorias', UsuarioController.findCategoriasByUsuarioIncludingPredefinidas);
    app.get('/categorias', UsuarioController.findAllCategorias);

    // Rutas para alarmas
    app.post('/usuarios/:id/alarmas', UsuarioController.addAlarmaToUsuario);
}

