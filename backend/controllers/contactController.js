// backend/controllers/contactController.js
const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const msg = new ContactMessage({ name, email, message });
    await msg.save();
    res.status(201).json({ msg: 'Message envoyé avec succès.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};