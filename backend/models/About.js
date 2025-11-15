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
  // Bureau exécutif : tableau d'objets
  executiveBoard: [{
    name: { type: String, required: true },
    title: { type: String, required: true }, // fonction
    email: { type: String },
    phone: { type: String },
    photo: { type: String } // URL vers l'image
  }],
  // Coordonnées générales
  address: String,
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);