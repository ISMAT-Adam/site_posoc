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
app.use(helmet());
app.use(cors()); // ← Doit être avant les routes
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use('/uploads', (req, res, next) => {
  cors(corsOptions)(req, res, () => {
    // Applique express.static après CORS
    express.static(path.join(__dirname, 'uploads'))(req, res, next);
  });
});
// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);

// Démarrage
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Erreur au démarrage :', err.message);
  process.exit(1);
});