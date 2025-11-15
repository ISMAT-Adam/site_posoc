// backend/routes/about.js
const express = require('express');
const router = express.Router();
const uploadPhoto = require('../middleware/uploadPhoto');

// ✅ Importe TOUTES les fonctions du contrôleur
const {
  getAbout,
  updateAbout,              // ← CETTE LIGNE ÉTAIT MANQUANTE
  addExecutiveMember,
  updateExecutiveMember,
  deleteExecutiveMember
} = require('../controllers/aboutController');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Routes
router.get('/', getAbout);
router.put('/', auth, admin, updateAbout); // ← Dépend de updateAbout

// ✅ Bureau exécutif
router.post('/executive', auth, admin, addExecutiveMember);
router.put('/executive/:index', auth, admin, updateExecutiveMember);
router.delete('/executive/:index', auth, admin, deleteExecutiveMember);

// ✅ Upload de photo pour le bureau exécutif
router.post('/executive/upload', auth, admin, uploadPhoto, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'Fichier manquant.' });
  }
  res.json({ photoUrl: `/uploads/photos/${req.file.filename}` });
});

module.exports = router;