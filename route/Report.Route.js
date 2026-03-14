const express = require('express');
const router = express.Router();
const { ReportController } = require('../controller/Report.Controller');

const { requireAdmin } = require('../middlewares/authMiddlewares');  

console.log('Middleware admin:', requireAdmin);
console.log('Controller function:', ReportController.obtenerCorte);

router.get('/corte-diario', requireAdmin, ReportController.obtenerCorte);

module.exports = router;