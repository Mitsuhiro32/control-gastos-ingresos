const UsuarioController = require('./controller/gasto.controller');

module.exports = function (app) {
    // Rutas para usuarios
    app.get('/usuarios', usuarioController.findAllUsuarios);
    app.get('/usuarios/:id', usuarioController.findOneUsuario);
    app.post('/usuarios', usuarioController.createUsuario);
    app.delete('/usuarios/:id', usuarioController.deleteUsuario);

    // Rutas para ingresos
    app.post('/usuarios/:id/ingresos', usuarioController.addIngresoToUsuario);
    app.get('/usuarios/:id/ingresos', usuarioController.findAllIngresos);

    // Rutas para gastos
    app.post('/usuarios/:id/gastos', usuarioController.addGastoToUsuario);
    app.get('/usuarios/:id/gastos', usuarioController.findAllGastos);

    // Rutas para alarmas
    app.post('/usuarios/:id/alarmas', usuarioController.addAlarmaToUsuario);
}