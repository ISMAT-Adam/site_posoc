// backend/controllers/authController.js
const User = require('../models/User');
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, password, name, domain, location, phone, address } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Cet email est déjà utilisé.' });

    const member = new Member({ name, domain, location, email, phone, address });
    await member.save();

    user = new User({ email, password, role: 'member', associationId: member._id });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { id: user._id, email, role: 'member' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ msg: 'Identifiants invalides.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur.' });
  }
};