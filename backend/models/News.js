// backend/models/News.js
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['actualite', 'evenement', 'communique'],
    default: 'actualite'
  },
  date: { type: Date, default: Date.now },
  images: [String] // URLs des images uploadées
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);