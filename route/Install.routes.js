const router = require('express').Router();
const { InstallController } = require('../controller/installController');

router.get('/', InstallController.install);

module.exports = router;