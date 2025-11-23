// backend/scripts/fixExecutivePhotos.js
// Script utilitaire : corrige les chemins des photos du bureau exécutif
// Utilisation : `node scripts/fixExecutivePhotos.js` à lancer depuis le dossier `backend`.

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const connectDB = require('../config/db');
const About = require('../models/About');

const DEFAULT_PHOTO = '/uploads/photos/Zakaria.jpeg'; // photo existante dans le repo

async function fix() {
  await connectDB();
  try {
    const about = await About.findOne();
    if (!about) {
      console.log('Aucun document About trouvé. Rien à faire.');
      process.exit(0);
    }

    let changed = false;
    const uploadsDir = path.join(__dirname, '..', 'uploads');

    about.executiveBoard = about.executiveBoard.map(member => {
      let photo = member.photo || '';

      // Si photo vide ou référence explicite à president.jpg, on remplace
      if (!photo || photo.includes('president.jpg')) {
        member.photo = DEFAULT_PHOTO;
        changed = true;
        return member;
      }

      // Normaliser : retirer éventuel host
      if (photo.startsWith('http')) {
        try {
          const url = new URL(photo);
          photo = url.pathname;
        } catch (e) {
          // ignore
        }
      }

      // Vérifier si le fichier existe physiquement dans backend/uploads
      const filePath = photo.startsWith('/') ? path.join(__dirname, '..', photo) : path.join(uploadsDir, photo);
      if (!fs.existsSync(filePath)) {
        console.log(`Fichier manquant pour ${member.name}: ${filePath} — remplacement par ${DEFAULT_PHOTO}`);
        member.photo = DEFAULT_PHOTO;
        changed = true;
      } else {
        // stocker la forme standard (chemin relatif commençant par /uploads)
        const rel = path.relative(path.join(__dirname, '..'), filePath);
        member.photo = `/${rel.replace(/\\\\/g, '/')}`;
      }

      return member;
    });

    if (changed) {
      await about.save();
      console.log('Mise à jour effectuée sur le document About.');
    } else {
      console.log('Aucun changement nécessaire.');
    }
  } catch (err) {
    console.error('Erreur lors de la correction :', err.message);
  } finally {
    process.exit(0);
  }
}

fix();
