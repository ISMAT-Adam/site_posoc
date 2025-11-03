// backend/models/About.js
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  // Contenu en français
  fr: {
    history: String,
    mission: String,
    vision: String,
    values: [String]
  },
  // Contenu en arabe
  ar: {
    history: String,
    mission: String,
    vision: String,
    values: [String]
  },
  // Bureau exécutif
  executiveBoard: [{
    name: String,
    title: String, // fonction
    email: String,
    phone: String,
    photo: String // URL vers l'image
  }],
  // Coordonnées
  address: String,
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);