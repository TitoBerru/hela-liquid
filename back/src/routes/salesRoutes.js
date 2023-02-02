const express = require('express');
const router = express.Router();
const salesController = require ('../controllers/salesController')

/* GET recipes */
router.get('/', salesController.list);

module.exports = router;