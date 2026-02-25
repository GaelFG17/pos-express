const router = require('express').Router();
const { ProductsController } = require('../controller/productsController');


router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);
router.post('/', ProductsController.create);
router.put('/:id', ProductsController.update);
router.patch('/:id/stock', ProductsController.adjust);
router.delete('/:id', ProductsController.delete);

module.exports = router;