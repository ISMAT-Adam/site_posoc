// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments } = require('../controllers/documentController');

router.get('/', getAllDocuments);

module.exports = router;