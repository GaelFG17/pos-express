const router = require('express').Router();
const { SalesController } = require('../controller/Sales.controller');


router.get('/recientes', SalesController.recientes);

module.exports = router;