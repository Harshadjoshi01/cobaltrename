const express = require('express');
const router = express.Router();
const { getdocusignaccesstoken, getdocusigncode, getuserinfo } = require('../controllers/auth.controller');

router.get('/redirect', getdocusignaccesstoken);
router.get('/accesstoken', getdocusigncode);
router.get('/userinfo', getuserinfo);
//New commit 

module.exports = router;
