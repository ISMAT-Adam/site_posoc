// backend/routes/contact.js
const express = require('express');
const router = express.Router();

// ✅ Importe les fonctions correctement
const {
  sendMessage,
  getAllMessages,
  markAsRead
} = require('../controllers/contactController');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Route publique : envoi de message
router.post('/', sendMessage);

// Routes admin : lecture et gestion
router.get('/messages', auth, admin, getAllMessages);
router.patch('/messages/:id/read', auth, admin, markAsRead);

module.exports = router;