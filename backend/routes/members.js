const express = require('express');
const router = express.Router();
const uploadLogo = require('../middleware/uploadLogo');
const {
  getAllMembers,
  getMyMember,
  updateMyMember,
  deleteMyMember,
  deleteMemberById // ← important !
} = require('../controllers/memberController');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Routes publiques
router.get('/', getAllMembers);

// Routes membres (connectés)
router.get('/me', auth, getMyMember);
router.put('/me', auth, updateMyMember);
router.delete('/me', auth, deleteMyMember);

// Route admin
router.delete('/admin/:id', auth, admin, deleteMemberById); // ← cette ligne est cruciale

// Routes admin
router.get('/pending', auth, admin, async (req, res) => {
  try {
    const members = await Member.find({ status: 'pending' });
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
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
    res.status(500).json({ msg: 'Erreur serveur.' });
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
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
});


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

    const updated = await require('../models/Member').findByIdAndUpdate(
      user.associationId,
      { logo: `/uploads/logos/${req.file.filename}` },
      { new: true }
    );

    res.json({ msg: 'Logo mis à jour.', member: updated });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
});

module.exports = router;