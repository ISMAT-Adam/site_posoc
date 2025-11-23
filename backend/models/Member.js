const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  location: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  logo: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' // ← par défaut en attente
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);