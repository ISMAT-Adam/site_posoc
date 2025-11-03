// backend/routes/news.js
const express = require('express');
const router = express.Router();
const { getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const uploadNewsImages = require('../middleware/uploadNewsImages');

// Route publique
router.get('/', getAllNews);

// Routes admin
router.post('/', auth, admin, uploadNewsImages, createNews);
router.put('/:id', auth, admin, uploadNewsImages, updateNews);
router.delete('/:id', auth, admin, deleteNews);

module.exports = router;