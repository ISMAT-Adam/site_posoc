// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
console.log('MONGO_URI =', process.env.MONGO_URI);

const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const newsRoutes = require('./routes/news');
const documentRoutes = require('./routes/documents');
const contactRoutes = require('./routes/contact');
const aboutRoutes = require('./routes/about');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ✅ CORRIGÉ : Autorise les origines spécifiques
app.use(cors({
  origin: 'http://localhost:5173', // ← Ajouté ici aussi pour plus de sécurité
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// ✅ CORRIGÉ : Appliquer CORS aussi aux fichiers statiques
// app.use('/uploads', cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }), express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
  // Applique CORS à toutes les réponses, même les 304
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin'); // Important pour le cache

  // Passe au middleware static
  express.static(path.join(__dirname, 'uploads'))(req, res, next);
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes); // ← Cette ligne est OK

// ✅ Route par défaut pour vérifier que le serveur est lancé
app.get('/', (req, res) => {
  res.json({ msg: 'Serveur POSOC lancé avec succès.' });
});

// Démarrage
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Erreur au démarrage :', err.message);
  process.exit(1);
});