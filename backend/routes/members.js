// backend/routes/members.js
const express = require('express');
const router = express.Router();

const { getAllMembers, getMyMember, updateMyMember, deleteMyMember } = require('../controllers/memberController');

// ✅ Importe les middlewares avec des noms DISTINCTS
const auth = require('../middleware/auth');        // pour authentification
const admin = require('../middleware/admin');      // pour rôle admin (si utilisé)

// Routes publiques
router.get('/', getAllMembers);

// Routes protégées (membre connecté)
router.get('/me', auth, getMyMember);
router.put('/me', auth, updateMyMember);
router.delete('/me', auth, deleteMyMember);

// Exemple de route admin (si besoin plus tard)
// router.delete('/:id', auth, admin, ...);

module.exports = router;