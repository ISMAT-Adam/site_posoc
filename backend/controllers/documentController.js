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

exports.createDocument = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) return res.status(400).json({ msg: 'Fichier manquant.' });

    const fileUrl = `/uploads/documents/${req.file.filename}`;

    const doc = new Document({ title, category, fileUrl });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de l’upload.' });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ msg: 'Document non trouvé.' });
    // 🔸 Optionnel : supprimer physiquement le fichier avec fs.unlink
    res.json({ msg: 'Document supprimé.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la suppression.' });
  }
};

// backend/controllers/documentController.js
exports.deleteDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ msg: 'Document non trouvé.' });

    // ⚠️ Optionnel : supprimer physiquement le fichier avec fs.unlink
    await Document.findByIdAndDelete(id);
    res.json({ msg: 'Document supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la suppression.' });
  }
};