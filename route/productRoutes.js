const router = require('express').Router();
const { ProductsController } = require('../controller/productController');
const { requireAdmin } = require('../middlewares/authMiddlewares');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);
router.post('/', requireAdmin, ProductsController.create);
router.put('/:id', requireAdmin, ProductsController.update);
router.patch('/:id/stock', requireAdmin, ProductsController.adjust);
router.delete('/:id', requireAdmin, ProductsController.delete);

module.exports = router;