// backend/controllers/memberController.js
const Member = require('../models/Member');
const User = require('../models/User');

// ✅ Obtenir tous les membres PUBLICS (uniquement approved)
exports.getAllMembers = async (req, res) => {
  try {
    // Par défaut, public = uniquement les approved
    const members = await Member.find({ status: 'approved' }).select('-__v');
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Obtenir mon propre profil (membre connecté)
exports.getMyMember = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('associationId');
    if (!user || !user.associationId) {
      return res.status(404).json({ msg: 'Aucune association trouvée.' });
    }
    const member = await Member.findById(user.associationId);
    if (!member) return res.status(404).json({ msg: 'Profil non trouvé.' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Mettre à jour mon profil (y compris logo via upload séparé)
exports.updateMyMember = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.associationId) return res.status(404).json({ msg: 'Association non trouvée.' });

    const updated = await Member.findByIdAndUpdate(
      user.associationId,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Supprimer mon association
exports.deleteMyMember = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.associationId) return res.status(404).json({ msg: 'Association non trouvée.' });

    await Member.findByIdAndDelete(user.associationId);
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: 'Association supprimée.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// ✅ Supprimer un membre par ID (réservé à l'admin)
exports.deleteMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ msg: 'Membre non trouvé.' });

    const user = await User.findOne({ associationId: id });
    if (user) await User.findByIdAndDelete(user._id);

    await Member.findByIdAndDelete(id);
    res.json({ msg: 'Membre supprimé avec succès.' });
  } catch (err) {
    console.error('Erreur dans deleteMemberById:', err);
    res.status(500).json({ msg: 'Erreur serveur lors de la suppression.' });
  }
};

// ✅ Obtenir les demandes en attente (admin)
exports.getPendingMembers = async (req, res) => {
  try {
    const members = await Member.find({ status: 'pending' });
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur lors du chargement des demandes.' });
  }
};

// ✅ Approuver un membre (admin)
exports.approveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );
    if (!member) return res.status(404).json({ msg: 'Membre non trouvé.' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de l’approbation.' });
  }
};

// ✅ Rejeter un membre (admin)
exports.rejectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );
    if (!member) return res.status(404).json({ msg: 'Membre non trouvé.' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors du rejet.' });
  }
};