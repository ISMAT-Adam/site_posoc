// backend/controllers/documentController.js
const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ uploadedAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};