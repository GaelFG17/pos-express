const express = require('express');
const router = express.Router();
const { installSystem } = require('../controller/install.Controller');

router.get('/', installSystem);

module.exports = router;