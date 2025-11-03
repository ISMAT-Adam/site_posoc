// backend/controllers/memberController.js
const Member = require('../models/Member');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select('-__v');
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

// À étendre plus tard avec recherche/filtre
exports.getMyMember = async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id).select('associationId');
    if (!user || !user.associationId) {
      return res.status(404).json({ msg: 'Aucune association trouvée.' });
    }
    const member = await require('../models/Member').findById(user.associationId);
    if (!member) return res.status(404).json({ msg: 'Profil non trouvé.' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

exports.updateMyMember = async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (!user || !user.associationId) return res.status(404).json({ msg: 'Association non trouvée.' });

    const updated = await require('../models/Member').findByIdAndUpdate(
      user.associationId,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

exports.deleteMyMember = async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (!user || !user.associationId) return res.status(404).json({ msg: 'Association non trouvée.' });

    await require('../models/Member').findByIdAndDelete(user.associationId);
    await require('../models/User').findByIdAndDelete(req.user.id);

    res.json({ msg: 'Association supprimée.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};