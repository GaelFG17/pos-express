const router = require('express').Router();
const { ProductsController } = require('../controller/productsController');
const { requireAdmin } = require('../middlewares/auth');

// Rutas Públicas (Cualquiera puede leer)
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);

// Rutas Protegidas (Solo administradores)
router.post('/', requireAdmin, ProductsController.create);
router.put('/:id', requireAdmin, ProductsController.update);
router.patch('/:id/stock', requireAdmin, ProductsController.adjust);
router.delete('/:id', requireAdmin, ProductsController.delete);

module.exports = router;