// backend/routes/members.js
const express = require('express');
const router = express.Router();

// ⚠️ Ajout crucial : import du modèle Member
const Member = require('../models/Member');

// Middlewares
const uploadLogo = require('../middleware/uploadLogo');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Contrôleurs
const {
  getAllMembers,
  getMyMember,
  updateMyMember,
  deleteMyMember,
  deleteMemberById
} = require('../controllers/memberController');

// ┌──────────────────────────────┐
// │ Routes PUBLIQUES             │
// └──────────────────────────────┘
router.get('/', getAllMembers);

// ┌──────────────────────────────┐
// │ Routes MEMBRES (connectés)   │
// └──────────────────────────────┘
router.get('/me', auth, getMyMember);
router.put('/me', auth, updateMyMember);
router.delete('/me', auth, deleteMyMember);

// ✅ Upload de logo pour le membre connecté
router.put('/me/logo', auth, uploadLogo, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'Fichier manquant.' });
  }

  try {
    const user = await require('../models/User').findById(req.user.id).select('associationId');
    if (!user || !user.associationId) {
      return res.status(404).json({ msg: 'Association non trouvée.' });
    }

    const updated = await Member.findByIdAndUpdate(
      user.associationId,
      { logo: `/uploads/logos/${req.file.filename}` },
      { new: true }
    );

    res.json({ msg: 'Logo mis à jour.', member: updated });
  } catch (err) {
    console.error('Erreur upload logo:', err);
    res.status(500).json({ msg: 'Erreur serveur lors de l’upload du logo.' });
  }
});

// ┌──────────────────────────────┐
// │ Routes ADMIN uniquement      │
// └──────────────────────────────┘
router.delete('/admin/:id', auth, admin, deleteMemberById);

// Liste des demandes en attente
router.get('/pending', auth, admin, async (req, res) => {
  try {
    const members = await Member.find({ status: 'pending' });
    res.json(members);
  } catch (err) {
    console.error('Erreur dans /pending:', err);
    res.status(500).json({ msg: 'Erreur serveur lors du chargement des demandes.' });
  }
});

// Approuver un membre
router.put('/approve/:id', auth, admin, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!member) return res.status(404).json({ msg: 'Membre non trouvé.' });
    res.json(member);
  } catch (err) {
    console.error('Erreur dans /approve:', err);
    res.status(500).json({ msg: 'Erreur serveur lors de l’approbation.' });
  }
});

// Rejeter un membre
router.put('/reject/:id', auth, admin, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!member) return res.status(404).json({ msg: 'Membre non trouvé.' });
    res.json(member);
  } catch (err) {
    console.error('Erreur dans /reject:', err);
    res.status(500).json({ msg: 'Erreur serveur lors du rejet.' });
  }
});

module.exports = router;