const express = require('express');
const router = express.Router();
const { getdocusignaccesstoken } = require('../controllers/auth.controller');

router.get('/getdocusignaccesstoken', getdocusignaccesstoken);

module.exports = router;
