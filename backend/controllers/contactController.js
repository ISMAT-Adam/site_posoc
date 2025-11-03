// backend/controllers/contactController.js
const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const msg = new ContactMessage({ name, email, message });
    await msg.save();
    res.status(201).json({ msg: 'Message envoyé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(msg);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};