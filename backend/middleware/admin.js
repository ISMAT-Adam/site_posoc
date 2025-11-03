// backend/middleware/admin.js
module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Accès réservé à l’administrateur.' });
  }
  next();
};