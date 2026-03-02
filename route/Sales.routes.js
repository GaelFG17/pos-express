const router = require('express').Router();
const { SalesController } = require('../controller/Sales.controller');

router.get('/recientes', SalesController.recientes);
router.post('/crear', SalesController.crearVenta);

module.exports = router;