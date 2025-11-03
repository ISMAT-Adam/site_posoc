// backend/routes/about.js
const express = require('express');
const router = express.Router();

// ✅ Importe TOUTES les fonctions utilisées
const { getAbout, updateAbout } = require('../controllers/aboutController');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Routes
router.get('/', getAbout);
router.put('/', auth, admin, updateAbout); // ← maintenant défini

module.exports = router;