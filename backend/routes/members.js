const express = require('express');
const router = express.Router();
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

module.exports = router;