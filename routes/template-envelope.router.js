const express = require('express');
const router = express.Router();
const { createtemplate, getalltemplate, gettemplateinfo, createenvelope } = require('../controllers/template-envelope.controller');
const Multer = require("multer");
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/createtemplate', multer.single("file"), createtemplate);
router.get('/getalltemplate', getalltemplate);
router.get('/gettemplateinfo', gettemplateinfo);
router.post('/createenvelope', createenvelope);

module.exports = router;