// backend/models/Member.js
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  location: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  logo: { type: String } // URL vers l'image uploadée
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);