// backend/controllers/authController.js
const User = require('../models/User');
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, password, name, domain, location, phone, address } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe déjà (via email)
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Cet email est déjà utilisé.' });

    // 2. Vérifier si une association existe déjà avec ce nom
    const existingMember = await Member.findOne({ name });
    if (existingMember) return res.status(400).json({ msg: 'Une association avec ce nom existe déjà.' });

    // 3. ✅ Vérification : si l'utilisateur est connecté et a déjà une association
    // (cette partie est utile si tu appelles register via une route protégée)
    // Mais dans ton cas, register est public, donc on empêche juste la duplication par email
    // Si tu veux empêcher un utilisateur connecté de réenregistrer, tu peux vérifier `req.user` si la route est protégée.

    const member = new Member({ name, domain, location, email, phone, address });
    await member.save();

    user = new User({ email, password, role: 'member', associationId: member._id });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({ token, user: { id: user._id, email, role: 'member' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};