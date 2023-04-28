const express = require('express');
const router = express.Router();
const { getdocusignaccesstoken } = require('../controllers/auth.controller');

router.get('/redirect', getdocusignaccesstoken);

module.exports = router;
