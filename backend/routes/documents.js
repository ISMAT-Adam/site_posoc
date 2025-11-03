// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments, createDocument, deleteDocument } = require('../controllers/documentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const uploadDocument = require('../middleware/uploadDocument');

// Route publique
router.get('/', getAllDocuments);

// Routes admin
router.post('/', auth, admin, uploadDocument, createDocument);
router.delete('/:id', auth, admin, deleteDocument);

module.exports = router;