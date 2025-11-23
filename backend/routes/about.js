// backend/routes/about.js
const express = require('express');
const router = express.Router();
const {
  getAbout,
  updateAbout,
  addExecutiveMember,
  updateExecutiveMember,
  deleteExecutiveMember
} = require('../controllers/aboutController');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// ✅ Routes publiques
router.get('/', getAbout);

// ✅ Routes admin
router.put('/', auth, admin, updateAbout);

// ✅ Gestion du bureau exécutif
router.post('/executive', auth, admin, addExecutiveMember);
router.put('/executive/:index', auth, admin, updateExecutiveMember);
router.delete('/executive/:index', auth, admin, deleteExecutiveMember);

module.exports = router;