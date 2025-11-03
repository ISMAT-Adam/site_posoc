// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv'); 
const path = require('path');

dotenv.config(); // ← 2. Charge .env IMMÉDIATEMENT
console.log('MONGO_URI =', process.env.MONGO_URI); // ← pour déboguer

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
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
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
});